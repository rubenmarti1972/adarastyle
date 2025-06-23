// domains/products/pages/list/list.component.ts
import {
  Component,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref, ActivatedRoute } from '@angular/router';
import { ProductComponent } from '@products/components/product/product.component';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
})
export default class ListComponent implements OnInit {
  // Señales que guardan los datos
  products   = signal<Product[]>([]);
  categories = signal<Category[]>([]);

  // Inyectamos servicios y ActivatedRoute
  private cartService     = inject(CartService);
  private productService  = inject(ProductService);
  private categoryService = inject(CategoryService);
  private route           = inject(ActivatedRoute);

  ngOnInit() {
    // 1️⃣ Cargo categorías para el menú lateral
    this.categoryService.getCategories().subscribe(cats => {
      this.categories.set(cats);
    });

    // 2️⃣ Cada vez que cambia la ruta (o al inicio), leo el slug y cargo productos filtrados
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug'); // null si ruta '/'
      this.productService.getProductsWhatsapp().subscribe(all => {
        // Si hay slug, filtro; si no, muestro todos
        const filtered = slug
          ? all.filter(p => p.category?.slug === slug)
          : all;
        this.products.set(filtered);
      });
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
