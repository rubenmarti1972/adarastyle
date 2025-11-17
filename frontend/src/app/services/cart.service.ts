import { Injectable, signal, computed } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cart, CartItem } from '../models/cart.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Signal para el carrito actual
  private cartSignal = signal<Cart | null>(null);

  // Computed signals para datos derivados
  public cart = computed(() => this.cartSignal());
  public itemCount = computed(() => {
    const cart = this.cartSignal();
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  });
  public total = computed(() => this.cartSignal()?.total ?? 0);
  public isEmpty = computed(() => this.itemCount() === 0);

  private sessionId: string;

  constructor(private apiService: ApiService) {
    this.sessionId = this.getOrCreateSessionId();
    this.loadCart();
  }

  private getOrCreateSessionId(): string {
    let sessionId = localStorage.getItem('cart_session_id');

    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('cart_session_id', sessionId);
    }

    return sessionId;
  }

  loadCart(): void {
    this.apiService.get<Cart>('cart', { sessionId: this.sessionId })
      .subscribe({
        next: (cart) => {
          this.cartSignal.set(cart);
        },
        error: (error) => {
          console.error('Error loading cart:', error);
        }
      });
  }

  addItem(productId: number, quantity: number = 1): Observable<Cart> {
    return this.apiService.post<Cart>('cart/add', {
      sessionId: this.sessionId,
      productId,
      quantity
    }).pipe(
      tap(cart => this.cartSignal.set(cart))
    );
  }

  updateItem(itemId: number, quantity: number): Observable<Cart> {
    return this.apiService.put<Cart>('cart/update', {
      sessionId: this.sessionId,
      itemId,
      quantity
    }).pipe(
      tap(cart => this.cartSignal.set(cart))
    );
  }

  removeItem(itemId: number): Observable<Cart> {
    return this.apiService.post<Cart>('cart/remove', {
      sessionId: this.sessionId,
      itemId
    }).pipe(
      tap(cart => this.cartSignal.set(cart))
    );
  }

  clearCart(): Observable<Cart> {
    return this.apiService.post<Cart>('cart/clear', {
      sessionId: this.sessionId
    }).pipe(
      tap(cart => this.cartSignal.set(cart))
    );
  }

  // Ya no necesitamos estos métodos, se usan los computed signals directamente
  // getCart() -> usar cart()
  // getItemCount() -> usar itemCount()
}
