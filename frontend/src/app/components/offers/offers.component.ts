import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="offers-section">
      <div class="offers-container">
        <div class="offers-header">
          <div class="sparkle-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
          <h2 class="offers-title">¡Ofertas Especiales!</h2>
          <p class="offers-subtitle">Descuentos exclusivos por tiempo limitado</p>
        </div>

        <div class="offers-grid" *ngIf="offers().length > 0; else noOffers">
          <div class="offer-card" *ngFor="let product of offers()">
            <div class="offer-badge">
              <span class="badge-text">{{ getDiscountPercent(product) }}% OFF</span>
            </div>

            <a [routerLink]="['/products', product.slug]" class="offer-image-wrapper">
              <img [src]="getProductImage(product)" [alt]="product.name" class="offer-image">
            </a>

            <div class="offer-content">
              <a [routerLink]="['/products', product.slug]" class="offer-name">{{ product.name }}</a>

              <div class="offer-prices">
                <span class="original-price">{{ formatPrice(product.price) }}</span>
                <span class="sale-price">{{ formatPrice(product.salePrice!) }}</span>
              </div>

              <div class="offer-savings">
                Ahorras {{ formatPrice(product.price - product.salePrice!) }}
              </div>

              <a [routerLink]="['/products', product.slug]" class="offer-button">
                <span>Ver Oferta</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <ng-template #noOffers>
          <div class="no-offers">
            <div class="clock-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <h3>Próximamente nuevas ofertas</h3>
            <p>Estamos preparando increíbles descuentos para ti</p>
          </div>
        </ng-template>
      </div>
    </section>
  `,
  styles: [`
    .offers-section {
      padding: var(--spacing-xxl) 0;
      background: var(--color-background);
      overflow: hidden;
      position: relative;
    }

    [data-theme="luxury"] .offers-section {
      background: linear-gradient(135deg,
        rgba(139, 21, 56, 0.03) 0%,
        rgba(212, 175, 55, 0.05) 50%,
        rgba(139, 21, 56, 0.03) 100%
      );
    }

    .offers-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--spacing-md);
    }

    .offers-header {
      text-align: center;
      margin-bottom: var(--spacing-xxl);
      animation: fade-slide-up 0.8s ease-out;
    }

    .sparkle-icon {
      display: inline-block;
      color: var(--color-secondary);
      margin-bottom: var(--spacing-md);
      animation: sparkle-rotate 3s ease-in-out infinite;
    }

    [data-theme="luxury"] .sparkle-icon {
      color: var(--color-secondary);
      filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.6));
    }

    @keyframes sparkle-rotate {
      0%, 100% {
        transform: rotate(0deg) scale(1);
      }
      25% {
        transform: rotate(-10deg) scale(1.1);
      }
      50% {
        transform: rotate(10deg) scale(1);
      }
      75% {
        transform: rotate(-10deg) scale(1.1);
      }
    }

    .offers-title {
      font-family: var(--font-primary);
      font-size: 3rem;
      font-weight: var(--font-heading-weight);
      color: var(--color-primary);
      margin-bottom: var(--spacing-sm);
      letter-spacing: -0.02em;
    }

    [data-theme="luxury"] .offers-title {
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .offers-subtitle {
      font-size: 1.25rem;
      color: var(--color-text-light);
      font-weight: 500;
    }

    [data-theme="luxury"] .offers-subtitle {
      color: var(--color-secondary);
    }

    .offers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--spacing-xl);
      animation: fade-in 1s ease-out 0.3s both;
    }

    @keyframes fade-slide-up {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .offer-card {
      background: white;
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-md);
      transition: all var(--animation-duration) var(--animation-easing);
      position: relative;
      animation: slide-up-stagger 0.6s ease-out both;
    }

    .offer-card:nth-child(1) { animation-delay: 0.1s; }
    .offer-card:nth-child(2) { animation-delay: 0.2s; }
    .offer-card:nth-child(3) { animation-delay: 0.3s; }
    .offer-card:nth-child(4) { animation-delay: 0.4s; }

    @keyframes slide-up-stagger {
      from {
        opacity: 0;
        transform: translateY(40px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .offer-card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-xl);
    }

    [data-theme="luxury"] .offer-card {
      background: rgba(255, 255, 255, 0.06);
      backdrop-filter: blur(15px);
      border: 2px solid rgba(212, 175, 55, 0.3);
    }

    [data-theme="luxury"] .offer-card:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: var(--color-secondary);
      box-shadow: 0 12px 40px rgba(139, 21, 56, 0.3), 0 0 0 1px var(--color-secondary), var(--glow-gold);
    }

    .offer-badge {
      position: absolute;
      top: 15px;
      right: 15px;
      background: var(--color-error);
      color: white;
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--radius-full);
      font-weight: 700;
      font-size: 0.875rem;
      z-index: 10;
      box-shadow: var(--shadow-lg);
      animation: pulse-badge 2s ease-in-out infinite;
    }

    [data-theme="luxury"] .offer-badge {
      background: linear-gradient(135deg, var(--color-primary) 0%, #A91D48 100%);
      box-shadow: 0 4px 16px rgba(139, 21, 56, 0.4);
    }

    @keyframes pulse-badge {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }

    .badge-text {
      display: block;
      animation: shimmer 2s ease-in-out infinite;
    }

    @keyframes shimmer {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.8;
      }
    }

    .offer-image-wrapper {
      display: block;
      width: 100%;
      height: 280px;
      overflow: hidden;
      position: relative;
      background: var(--color-background-alt);
    }

    .offer-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--animation-slow) var(--animation-easing);
    }

    .offer-card:hover .offer-image {
      transform: scale(1.08);
    }

    .offer-content {
      padding: var(--spacing-lg);
    }

    .offer-name {
      display: block;
      font-family: var(--font-primary);
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-text);
      margin-bottom: var(--spacing-md);
      text-decoration: none;
      transition: color var(--animation-duration) var(--animation-easing);
    }

    .offer-name:hover {
      color: var(--color-primary);
    }

    [data-theme="luxury"] .offer-name:hover {
      color: var(--color-secondary);
    }

    .offer-prices {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-sm);
    }

    .original-price {
      font-size: 1rem;
      color: var(--color-text-light);
      text-decoration: line-through;
    }

    .sale-price {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-primary);
    }

    [data-theme="luxury"] .sale-price {
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .offer-savings {
      font-size: 0.875rem;
      color: var(--color-success);
      font-weight: 600;
      margin-bottom: var(--spacing-lg);
    }

    [data-theme="luxury"] .offer-savings {
      color: var(--color-primary);
    }

    .offer-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-sm);
      width: 100%;
      padding: var(--spacing-md) var(--spacing-lg);
      background: var(--color-primary);
      color: white;
      border: none;
      border-radius: var(--radius-md);
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all var(--animation-duration) var(--animation-easing);
      text-decoration: none;
    }

    .offer-button:hover {
      background: var(--color-secondary);
      transform: translateX(4px);
    }

    [data-theme="luxury"] .offer-button {
      background: linear-gradient(135deg, var(--color-primary) 0%, #A91D48 100%);
      box-shadow: 0 4px 16px rgba(139, 21, 56, 0.3);
    }

    [data-theme="luxury"] .offer-button:hover {
      background: linear-gradient(135deg, var(--color-secondary) 0%, #E8C75A 100%);
      color: #1a1a1a;
      box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
    }

    .offer-button svg {
      transition: transform var(--animation-duration) var(--animation-easing);
    }

    .offer-button:hover svg {
      transform: translateX(4px);
    }

    .no-offers {
      text-align: center;
      padding: var(--spacing-xxl) var(--spacing-lg);
      animation: fade-slide-up 0.8s ease-out;
    }

    .clock-icon {
      display: inline-block;
      color: var(--color-text-light);
      margin-bottom: var(--spacing-lg);
      animation: tick-tock 2s ease-in-out infinite;
    }

    [data-theme="luxury"] .clock-icon {
      color: var(--color-secondary);
      filter: drop-shadow(0 0 15px rgba(212, 175, 55, 0.4));
    }

    @keyframes tick-tock {
      0%, 100% {
        transform: rotate(-5deg);
      }
      50% {
        transform: rotate(5deg);
      }
    }

    .no-offers h3 {
      font-family: var(--font-primary);
      font-size: 2rem;
      color: var(--color-text);
      margin-bottom: var(--spacing-md);
    }

    [data-theme="luxury"] .no-offers h3 {
      color: var(--color-primary);
    }

    .no-offers p {
      font-size: 1.125rem;
      color: var(--color-text-light);
    }

    @media (max-width: 768px) {
      .offers-title {
        font-size: 2rem;
      }

      .offers-subtitle {
        font-size: 1rem;
      }

      .offers-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class OffersComponent implements OnInit {
  offers = signal<Product[]>([]);

  constructor(
    private productService: ProductService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers(): void {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        // Filter products that have a sale price
        const offersProducts = products.filter((p: Product) => p.salePrice && p.salePrice < p.price);
        this.offers.set(offersProducts);
      },
      error: (error: any) => {
        console.error('Error loading offers:', error);
      }
    });
  }

  getProductImage(product: Product): string {
    if (product.images && product.images.length > 0) {
      const url = this.apiService.getImageUrl(product.images[0]);
      if (url) return url;
    }
    return 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop';
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  }

  getDiscountPercent(product: Product): number {
    if (!product.salePrice) return 0;
    const discount = ((product.price - product.salePrice) / product.price) * 100;
    return Math.round(discount);
  }
}
