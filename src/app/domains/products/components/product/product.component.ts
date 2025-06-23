/* import { Component, input, output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { Product } from '@shared/models/product.model';

import { TimeAgoPipe } from '@shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-product',
  imports: [CommonModule, TimeAgoPipe, RouterLinkWithHref, NgOptimizedImage],
  templateUrl: './product.component.html',
})
export class ProductComponent {
  readonly product = input.required<Product>();

  readonly addToCart = output<Product>();

  addToCartHandler() {
    this.addToCart.emit(this.product());
  }
} */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '@shared/models/product.model';
import { TimeAgoPipe } from '@shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, TimeAgoPipe, RouterLink],
  templateUrl: './product.component.html',
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  addToCartHandler(): void {
    this.addToCart.emit(this.product);
  }
}
