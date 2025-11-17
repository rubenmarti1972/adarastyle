import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Theme } from '../models/theme.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentThemeSubject = new BehaviorSubject<Theme | null>(null);
  public currentTheme$ = this.currentThemeSubject.asObservable();

  constructor(private apiService: ApiService) {}

  loadActiveTheme(): void {
    this.apiService.get<any>('store-config', {
      populate: 'activeTheme'
    }).subscribe({
      next: (config) => {
        if (config?.activeTheme) {
          this.applyTheme(config.activeTheme);
        }
      },
      error: (error) => {
        console.error('Error loading active theme:', error);
      }
    });
  }

  applyTheme(theme: Theme): void {
    this.currentThemeSubject.next(theme);

    // Aplicar variables CSS
    const root = document.documentElement;

    // Colores
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${this.toKebabCase(key)}`, value);
    });

    // Fuentes
    root.style.setProperty('--font-primary', theme.fonts.primary);
    root.style.setProperty('--font-secondary', theme.fonts.secondary);
    root.style.setProperty('--font-heading-weight', theme.fonts.headingWeight);
    root.style.setProperty('--font-body-weight', theme.fonts.bodyWeight);

    // Espaciado
    Object.entries(theme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });

    // Border radius
    Object.entries(theme.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value);
    });

    // Sombras
    Object.entries(theme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });

    // Animaciones
    root.style.setProperty('--animation-duration', theme.animations.duration);
    root.style.setProperty('--animation-easing', theme.animations.easing);

    // CSS personalizado
    if (theme.customCSS) {
      this.applyCustomCSS(theme.customCSS);
    }
  }

  private applyCustomCSS(css: string): void {
    const styleId = 'theme-custom-css';
    let styleElement = document.getElementById(styleId);

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = css;
  }

  private toKebabCase(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }

  getAllThemes(): Observable<Theme[]> {
    return this.apiService.get<Theme[]>('themes');
  }

  getThemeBySlug(slug: string): Observable<Theme> {
    return this.apiService.get<Theme>(`themes`, {
      filters: { slug: { $eq: slug } }
    });
  }
}
