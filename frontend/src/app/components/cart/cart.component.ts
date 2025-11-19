import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';
import { Cart, CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart = this.cartService.cart;
  itemCount = this.cartService.itemCount;
  total = this.cartService.total;
  isEmpty = this.cartService.isEmpty;

  updatingItem: number | null = null;
  removingItem: number | null = null;

  constructor(
    private cartService: CartService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.cartService.loadCart();
  }

  updateQuantity(item: CartItem, newQuantity: number): void {
    if (newQuantity < 1) {
      return;
    }

    this.updatingItem = item.id;

    this.cartService.updateItem(item.id, newQuantity).subscribe({
      next: () => {
        this.updatingItem = null;
      },
      error: (error) => {
        console.error('Error updating cart:', error);
        this.updatingItem = null;
        alert('Error al actualizar la cantidad');
      }
    });
  }

  removeItem(item: CartItem): void {
    if (!confirm(\`¿Eliminar "\${item.product.name}" del carrito?\`)) {
      return;
    }

    this.removingItem = item.id;

    this.cartService.removeItem(item.id).subscribe({
      next: () => {
        this.removingItem = null;
      },
      error: (error) => {
        console.error('Error removing item:', error);
        this.removingItem = null;
        alert('Error al eliminar el producto');
      }
    });
  }

  clearCart(): void {
    if (!confirm('¿Vaciar todo el carrito?')) {
      return;
    }

    this.cartService.clearCart().subscribe({
      error: (error) => {
        console.error('Error clearing cart:', error);
        alert('Error al vaciar el carrito');
      }
    });
  }

  getProductImage(item: CartItem): string {
    if (item.product.images && item.product.images.length > 0) {
      const url = this.apiService.getImageUrl(item.product.images[0]);
      if (url) return url;
    }
    return 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop';
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  }

  getItemSubtotal(item: CartItem): number {
    return item.price * item.quantity;
  }

  checkout(): void {
    const currentCart = this.cart();
    if (!currentCart || !currentCart.items || currentCart.items.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    // Aquí implementarías la lógica de checkout real
    // Por ahora mostramos un resumen
    alert(\`
      RESUMEN DE COMPRA

      Total de productos: \${this.itemCount()}
      Total a pagar: \${this.formatPrice(this.total())}

      ¡Gracias por tu compra!
    \`);
  }
}
