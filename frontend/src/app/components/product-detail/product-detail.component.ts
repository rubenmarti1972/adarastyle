import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-detail" *ngIf="product">
      <div class="container">
        <div class="product-layout">
          <div class="product-images">
            <img [src]="getProductImage(product)" [alt]="product.name">
          </div>
          <div class="product-info">
            <h1>{{ product.name }}</h1>
            <p class="price">{{ formatPrice(product.salePrice || product.price) }}</p>
            <div [innerHTML]="product.description"></div>
            <button (click)="addToCart()" class="btn-add-cart">Agregar al Carrito</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 1200px; margin: 0 auto; padding: var(--spacing-xl); }
    .product-layout { display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-xxl); }
    .product-images img { width: 100%; border-radius: var(--radius-lg); }
    .product-info h1 { font-size: 2rem; margin-bottom: var(--spacing-md); }
    .price { font-size: 1.5rem; color: var(--color-primary); font-weight: 700; margin-bottom: var(--spacing-lg); }
    .btn-add-cart { background: var(--color-primary); color: var(--color-accent); padding: var(--spacing-md) var(--spacing-xl); border: none; border-radius: var(--radius-md); font-size: 1rem; font-weight: 600; cursor: pointer; }
    @media (max-width: 768px) { .product-layout { grid-template-columns: 1fr; } }
  `]
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productService.getProductBySlug(params['slug']).subscribe(product => {
        this.product = Array.isArray(product) ? product[0] : product;
      });
    });
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addItem(this.product.id, 1).subscribe(() => {
        alert('Producto agregado al carrito');
      });
    }
  }

  getProductImage(product: Product): string {
    if (product.images?.[0]) {
      return this.apiService.getImageUrl(product.images[0]);
    }
    return '';
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);
  }
}
