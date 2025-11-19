import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StoreConfigService } from '../../services/store-config.service';
import { DepartmentService } from '../../services/department.service';
import { CartService } from '../../services/cart.service';
import { StoreConfig } from '../../models/store-config.model';
import { Department } from '../../models/department.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="header-container">
        <div class="header-top">
          <div class="logo">
            <a routerLink="/" class="logo-link">
              <img *ngIf="config()?.logo" [src]="getImageUrl(config()!.logo)" [alt]="config()!.storeName" class="logo-img">
              <span class="logo-text">{{ config()?.storeName }}</span>
            </a>
          </div>

          <div class="header-actions">
            <button class="search-btn" aria-label="Buscar">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <a routerLink="/cart" class="cart-btn" aria-label="Carrito">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L19 6H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span *ngIf="cartItemCount() > 0" class="cart-badge">{{ cartItemCount() }}</span>
            </a>
          </div>
        </div>

        <nav class="nav">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">Inicio</a>
          <a
            *ngFor="let dept of departments"
            [routerLink]="['/departments', dept.slug]"
            routerLinkActive="active"
            class="nav-link"
          >
            {{ dept.name }}
          </a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--color-border);
      z-index: 1000;
      box-shadow: var(--shadow-md);
    }

    [data-theme="luxury"] .header {
      background: linear-gradient(180deg, rgba(139, 21, 56, 0.95) 0%, rgba(139, 21, 56, 0.98) 100%);
      border-bottom: 2px solid var(--color-secondary);
    }

    .header-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--spacing-md);
    }

    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-md) 0;
    }

    .logo-link {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      text-decoration: none;
      color: var(--color-text);
    }

    .logo-img {
      height: 40px;
      width: auto;
    }

    .logo-text {
      font-family: var(--font-primary);
      font-size: 2rem;
      font-weight: var(--font-heading-weight);
      color: var(--color-primary);
    }

    [data-theme="luxury"] .logo-text {
      color: var(--color-secondary);
      text-shadow: 0 2px 8px rgba(212, 175, 55, 0.5);
    }

    .header-actions {
      display: flex;
      gap: var(--spacing-md);
      align-items: center;
    }

    .search-btn,
    .cart-btn {
      position: relative;
      background: none;
      border: none;
      color: var(--color-text);
      cursor: pointer;
      padding: var(--spacing-sm);
      border-radius: var(--radius-sm);
      transition: all var(--animation-duration) var(--animation-easing);
      text-decoration: none;
      display: flex;
      align-items: center;
    }

    [data-theme="luxury"] .search-btn,
    [data-theme="luxury"] .cart-btn {
      color: var(--color-accent);
    }

    .search-btn:hover,
    .cart-btn:hover {
      background: var(--color-background-alt);
      color: var(--color-primary);
    }

    [data-theme="luxury"] .search-btn:hover,
    [data-theme="luxury"] .cart-btn:hover {
      background: rgba(212, 175, 55, 0.2);
      color: var(--color-secondary);
    }

    .cart-badge {
      position: absolute;
      top: 0;
      right: 0;
      background: var(--color-primary);
      color: var(--color-accent);
      border-radius: var(--radius-full);
      padding: 2px 6px;
      font-size: 0.75rem;
      font-weight: 600;
      min-width: 18px;
      text-align: center;
      animation: pulse-badge 2s infinite;
    }

    [data-theme="luxury"] .cart-badge {
      background: var(--gradient-secondary);
      color: #1a1a1a;
      font-weight: 800;
      box-shadow: var(--glow-gold);
    }

    @keyframes pulse-badge {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
    }

    .nav {
      display: flex;
      gap: var(--spacing-lg);
      padding: var(--spacing-md) 0;
      border-top: 1px solid var(--color-border);
      overflow-x: auto;
    }

    .nav-link {
      text-decoration: none;
      color: var(--color-text);
      font-family: var(--font-secondary);
      font-weight: 600;
      font-size: 1.125rem;
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--radius-md);
      transition: all var(--animation-duration) var(--animation-easing);
      white-space: nowrap;
    }

    .nav-link:hover,
    .nav-link.active {
      color: var(--color-primary);
      background: var(--color-background-alt);
    }

    [data-theme="luxury"] .nav-link {
      color: var(--color-accent);
      font-weight: 700;
    }

    [data-theme="luxury"] .nav-link:hover,
    [data-theme="luxury"] .nav-link.active {
      color: var(--color-secondary);
      background: rgba(212, 175, 55, 0.2);
    }

    @media (max-width: 768px) {
      .nav {
        gap: var(--spacing-sm);
      }

      .logo-text {
        font-size: 1.25rem;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  // Usar signals directamente desde los servicios
  config = this.storeConfigService.config;
  cartItemCount = this.cartService.itemCount;

  departments: Department[] = [];

  constructor(
    private storeConfigService: StoreConfigService,
    private departmentService: DepartmentService,
    public cartService: CartService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    // Solo cargar departments (aún usa Observable)
    this.departmentService.getDepartments().subscribe(departments => {
      this.departments = departments;
    });
  }

  getImageUrl(image: any): string {
    return this.apiService.getImageUrl(image);
  }
}
