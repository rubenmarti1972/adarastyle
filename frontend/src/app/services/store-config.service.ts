import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StoreConfig } from '../models/store-config.model';
import { ApiService } from './api.service';
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root'
})
export class StoreConfigService {
  private configSubject = new BehaviorSubject<StoreConfig | null>(null);
  public config$ = this.configSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private themeService: ThemeService
  ) {}

  loadConfig(): Observable<StoreConfig> {
    return this.apiService.get<StoreConfig>('store-config', {
      populate: ['logo', 'favicon', 'activeTheme']
    }).pipe(
      tap(config => {
        this.configSubject.next(config);

        // Aplicar tema activo
        if (config.activeTheme) {
          this.themeService.applyTheme(config.activeTheme);
        }

        // Actualizar meta tags
        this.updateMetaTags(config);

        // Actualizar favicon
        if (config.favicon) {
          this.updateFavicon(config.favicon);
        }
      })
    );
  }

  getConfig(): StoreConfig | null {
    return this.configSubject.value;
  }

  private updateMetaTags(config: StoreConfig): void {
    // Título
    if (config.metaTitle) {
      document.title = config.metaTitle;
    } else {
      document.title = `${config.storeName} - ${config.tagline}`;
    }

    // Meta description
    if (config.metaDescription) {
      this.updateMeta('description', config.metaDescription);
    }

    // Meta keywords
    if (config.metaKeywords) {
      this.updateMeta('keywords', config.metaKeywords);
    }
  }

  private updateMeta(name: string, content: string): void {
    let meta = document.querySelector(`meta[name="${name}"]`);

    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', name);
      document.head.appendChild(meta);
    }

    meta.setAttribute('content', content);
  }

  private updateFavicon(favicon: any): void {
    const faviconUrl = this.apiService.getImageUrl(favicon);

    let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");

    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    link.href = faviconUrl;
  }
}
