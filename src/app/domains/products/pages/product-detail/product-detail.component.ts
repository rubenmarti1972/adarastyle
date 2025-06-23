// product-detail.component.ts
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@shared/services/product.service';
import { CartService } from '@shared/services/cart.service';
import type { Product } from '@shared/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductDetailComponent implements OnInit {
  product = signal<Product | null>(null);
  cover   = signal<string>('');

  private route          = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService    = inject(CartService);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (!slug) return;
      this.productService.getOneSlug(slug).subscribe({
        next: prod => {
          this.product.set(prod);
          if (prod.images.length) {
            this.cover.set(prod.images[0]);
          }
        },
      });
    });
  }

  changeCover(img: string) {
    this.cover.set(img);
  }

  addToCart() {
    const p = this.product();
    if (p) this.cartService.addToCart(p);
  }
}
