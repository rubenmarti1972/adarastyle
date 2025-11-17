import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="product-list">
      <div class="container">
        <h1 class="page-title">{{ pageTitle }}</h1>
        <div class="products-grid">
          <div *ngFor="let product of products" class="product-card">
            <a [routerLink]="['/products', product.slug]">
              <img [src]="getProductImage(product)" [alt]="product.name">
              <h3>{{ product.name }}</h3>
              <p class="price">{{ formatPrice(product.salePrice || product.price) }}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 1200px; margin: 0 auto; padding: var(--spacing-xl) var(--spacing-md); }
    .page-title { font-size: 2rem; margin-bottom: var(--spacing-xl); text-align: center; }
    .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: var(--spacing-lg); }
    .product-card { background: var(--color-background); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm); }
    .product-card a { text-decoration: none; color: var(--color-text); }
    .product-card img { width: 100%; aspect-ratio: 1; object-fit: cover; }
    .product-card h3 { padding: var(--spacing-md); margin: 0; }
    .price { padding: 0 var(--spacing-md) var(--spacing-md); color: var(--color-primary); font-weight: 700; }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  pageTitle = 'Productos';

  constructor(
    private productService: ProductService,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['slug']) {
        this.loadProductsByDepartment(params['slug']);
      } else {
        this.loadAllProducts();
      }
    });
  }

  loadAllProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  loadProductsByDepartment(slug: string): void {
    this.productService.getProducts({ department: slug }).subscribe(products => {
      this.products = products;
    });
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
