import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { StoreConfigService } from './services/store-config.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
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
  }
}
