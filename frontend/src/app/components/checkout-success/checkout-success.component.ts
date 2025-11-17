import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="success-page">
      <div class="container">
        <h1>¡Pedido Realizado con Éxito!</h1>
        <p>Gracias por tu compra. Recibirás un correo con los detalles de tu orden.</p>
        <a routerLink="/" class="btn-home">Volver al Inicio</a>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 600px; margin: 0 auto; padding: var(--spacing-xxl); text-align: center; }
    h1 { color: var(--color-success); margin-bottom: var(--spacing-lg); }
    .btn-home { display: inline-block; margin-top: var(--spacing-xl); padding: var(--spacing-md) var(--spacing-xl); background: var(--color-primary); color: var(--color-accent); text-decoration: none; border-radius: var(--radius-md); }
  `]
})
export class CheckoutSuccessComponent {}
