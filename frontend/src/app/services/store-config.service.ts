import { Injectable, signal, computed } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StoreConfig } from '../models/store-config.model';
import { ApiService } from './api.service';
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root'
})
export class StoreConfigService {
  // Signal para la configuración de la tienda
  private configSignal = signal<StoreConfig | null>(null);

  // Computed signals para acceso público
  public config = computed(() => this.configSignal());
  public storeName = computed(() => this.configSignal()?.storeName ?? '');
  public logo = computed(() => this.configSignal()?.logo);

  constructor(
    private apiService: ApiService,
    private themeService: ThemeService
  ) {}

  loadConfig(): Observable<StoreConfig> {
    return this.apiService.get<StoreConfig>('store-config', {
      populate: ['logo', 'favicon', 'activeTheme']
    }).pipe(
      tap(config => {
        this.configSignal.set(config);

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
