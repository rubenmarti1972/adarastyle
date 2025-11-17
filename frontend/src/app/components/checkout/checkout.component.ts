import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Cart } from '../../models/cart.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="checkout-page">
      <div class="container">
        <h1>Finalizar Compra</h1>
        <form (ngSubmit)="processOrder()" #checkoutForm="ngForm">
          <div class="form-section">
            <h2>Información Personal</h2>
            <input type="text" name="firstName" [(ngModel)]="customerData.firstName" placeholder="Nombre" required>
            <input type="text" name="lastName" [(ngModel)]="customerData.lastName" placeholder="Apellido" required>
            <input type="email" name="email" [(ngModel)]="customerData.email" placeholder="Email" required>
            <input type="tel" name="phone" [(ngModel)]="customerData.phone" placeholder="Teléfono" required>
          </div>

          <div class="form-section">
            <h2>Dirección de Envío</h2>
            <input type="text" name="street" [(ngModel)]="shippingAddress.street" placeholder="Dirección" required>
            <input type="text" name="city" [(ngModel)]="shippingAddress.city" placeholder="Ciudad" required>
            <input type="text" name="state" [(ngModel)]="shippingAddress.state" placeholder="Departamento" required>
            <input type="text" name="postalCode" [(ngModel)]="shippingAddress.postalCode" placeholder="Código Postal">
          </div>

          <div class="form-section">
            <h2>Método de Pago</h2>
            <label><input type="radio" name="paymentMethod" value="wompi" [(ngModel)]="paymentMethod" required> Wompi</label>
            <label><input type="radio" name="paymentMethod" value="nequi" [(ngModel)]="paymentMethod"> Nequi</label>
          </div>

          <div class="order-summary" *ngIf="cart">
            <h3>Resumen del Pedido</h3>
            <p>Subtotal: {{ formatPrice(cart.subtotal) }}</p>
            <p>Impuesto: {{ formatPrice(cart.tax) }}</p>
            <p>Envío: {{ formatPrice(cart.shipping) }}</p>
            <h3>Total: {{ formatPrice(cart.total) }}</h3>
          </div>

          <button type="submit" [disabled]="!checkoutForm.valid || processing" class="btn-submit">
            {{ processing ? 'Procesando...' : 'Realizar Pedido' }}
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 800px; margin: 0 auto; padding: var(--spacing-xl); }
    .form-section { margin-bottom: var(--spacing-xl); }
    .form-section h2 { font-size: 1.5rem; margin-bottom: var(--spacing-md); }
    input[type="text"], input[type="email"], input[type="tel"] { width: 100%; padding: var(--spacing-md); margin-bottom: var(--spacing-md); border: 1px solid var(--color-border); border-radius: var(--radius-md); }
    label { display: block; margin-bottom: var(--spacing-sm); }
    .order-summary { background: var(--color-background-alt); padding: var(--spacing-lg); border-radius: var(--radius-lg); margin-bottom: var(--spacing-xl); }
    .btn-submit { width: 100%; padding: var(--spacing-md); background: var(--color-primary); color: var(--color-accent); border: none; border-radius: var(--radius-md); font-size: 1.125rem; font-weight: 600; cursor: pointer; }
    .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
  `]
})
export class CheckoutComponent implements OnInit {
  cart: Cart | null = null;
  processing = false;
  paymentMethod = 'wompi';

  customerData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    documentType: 'CC',
    documentNumber: ''
  };

  shippingAddress = {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Colombia'
  };

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      if (!cart || !cart.items?.length) {
        this.router.navigate(['/cart']);
      }
    });
  }

  processOrder(): void {
    this.processing = true;

    const orderData = {
      sessionId: this.cart?.sessionId,
      customerData: this.customerData,
      shippingAddress: this.shippingAddress,
      billingAddress: this.shippingAddress,
      paymentMethod: this.paymentMethod
    };

    this.orderService.createOrder(orderData).subscribe({
      next: (response) => {
        this.router.navigate(['/order', response.order.orderNumber]);
      },
      error: (error) => {
        alert('Error al procesar la orden');
        this.processing = false;
      }
    });
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);
  }
}
