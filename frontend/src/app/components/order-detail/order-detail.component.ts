import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="order-detail" *ngIf="order">
      <div class="container">
        <h1>Orden #{{ order.orderNumber }}</h1>
        <div class="order-status">Estado: {{ order.status }}</div>
        <div class="order-items">
          <h2>Productos</h2>
          <div *ngFor="let item of order.items">
            <p>{{ item.productName }} x {{ item.quantity }} = {{ formatPrice(item.subtotal) }}</p>
          </div>
        </div>
        <div class="order-total">
          <h3>Total: {{ formatPrice(order.total) }}</h3>
        </div>
        <a routerLink="/" class="btn-home">Volver al Inicio</a>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 800px; margin: 0 auto; padding: var(--spacing-xl); }
    .order-status { padding: var(--spacing-md); background: var(--color-info); color: white; border-radius: var(--radius-md); margin: var(--spacing-lg) 0; }
    .order-items { margin: var(--spacing-xl) 0; }
    .btn-home { display: inline-block; margin-top: var(--spacing-xl); padding: var(--spacing-md) var(--spacing-xl); background: var(--color-primary); color: var(--color-accent); text-decoration: none; border-radius: var(--radius-md); }
  `]
})
export class OrderDetailComponent implements OnInit {
  order: Order | null = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderService.getOrder(params['orderNumber']).subscribe(order => {
        this.order = order;
      });
    });
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);
  }
}
