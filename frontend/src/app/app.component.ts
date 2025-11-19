import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WhatsappButtonComponent } from './components/whatsapp-button/whatsapp-button.component';
import { StoreConfigService } from './services/store-config.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    WhatsappButtonComponent
  ],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
      <app-whatsapp-button></app-whatsapp-button>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .main-content {
      flex: 1;
      padding-top: 80px; /* Height of fixed header */
    }
  `]
})
export class AppComponent implements OnInit {
  constructor(
    private storeConfigService: StoreConfigService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    // Cargar configuración de la tienda y tema activo
    this.storeConfigService.loadConfig().subscribe();

    // CAMBIAR TEMA AQUÍ - Opciones: 'vibrant', 'minimalist', 'luxury', o quita esta línea para usar el default
    document.documentElement.setAttribute('data-theme', 'luxury'); // <-- Cambia 'luxury' por el tema que quieras
  }
}
