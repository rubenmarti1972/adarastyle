import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';
import { Cart } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="cart-page">
      <div class="container">
        <h1>Carrito de Compras</h1>
        <div *ngIf="cart && cart.items?.length > 0; else emptyCart">
          <div *ngFor="let item of cart.items" class="cart-item">
            <img [src]="getProductImage(item.product)" [alt]="item.product.name">
            <div class="item-info">
              <h3>{{ item.product.name }}</h3>
              <p class="price">{{ formatPrice(item.price) }}</p>
            </div>
            <div class="item-quantity">
              <button (click)="updateQuantity(item.id, item.quantity - 1)">-</button>
              <span>{{ item.quantity }}</span>
              <button (click)="updateQuantity(item.id, item.quantity + 1)">+</button>
            </div>
            <p class="item-subtotal">{{ formatPrice(item.subtotal) }}</p>
            <button (click)="removeItem(item.id)" class="btn-remove">Eliminar</button>
          </div>
          <div class="cart-summary">
            <p>Subtotal: {{ formatPrice(cart.subtotal) }}</p>
            <p>Impuesto (19%): {{ formatPrice(cart.tax) }}</p>
            <p>Envío: {{ formatPrice(cart.shipping) }}</p>
            <h3>Total: {{ formatPrice(cart.total) }}</h3>
            <a routerLink="/checkout" class="btn-checkout">Proceder al Pago</a>
          </div>
        </div>
        <ng-template #emptyCart>
          <p>Tu carrito está vacío</p>
          <a routerLink="/products" class="btn-continue">Continuar Comprando</a>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 1000px; margin: 0 auto; padding: var(--spacing-xl); }
    .cart-item { display: grid; grid-template-columns: 100px 1fr auto auto auto; gap: var(--spacing-md); align-items: center; padding: var(--spacing-md); border-bottom: 1px solid var(--color-border); }
    .cart-item img { width: 100px; height: 100px; object-fit: cover; border-radius: var(--radius-md); }
    .item-quantity { display: flex; gap: var(--spacing-sm); align-items: center; }
    .item-quantity button { padding: var(--spacing-xs) var(--spacing-sm); border: 1px solid var(--color-border); background: white; cursor: pointer; }
    .cart-summary { margin-top: var(--spacing-xl); padding: var(--spacing-lg); background: var(--color-background-alt); border-radius: var(--radius-lg); }
    .btn-checkout, .btn-continue { display: inline-block; margin-top: var(--spacing-md); padding: var(--spacing-md) var(--spacing-xl); background: var(--color-primary); color: var(--color-accent); text-decoration: none; border-radius: var(--radius-md); font-weight: 600; }
    .btn-remove { background: var(--color-error); color: white; padding: var(--spacing-xs) var(--spacing-sm); border: none; border-radius: var(--radius-sm); cursor: pointer; }
  `]
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;

  constructor(
    private cartService: CartService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });
  }

  updateQuantity(itemId: number, quantity: number): void {
    this.cartService.updateItem(itemId, quantity).subscribe();
  }

  removeItem(itemId: number): void {
    this.cartService.removeItem(itemId).subscribe();
  }

  getProductImage(product: any): string {
    if (product.images?.[0]) {
      return this.apiService.getImageUrl(product.images[0]);
    }
    return '';
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);
  }
}
