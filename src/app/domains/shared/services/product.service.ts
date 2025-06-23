import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Product } from '@shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private storageKey = 'products';
  private products: Product[] = this.loadProducts();
  private productsSubject = new BehaviorSubject<Product[]>(this.products);

  private loadProducts(): Product[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveProducts(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.products));
  }

  getProductsWhatsapp(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  addProduct(product: Product): void {
    const newProduct = { ...product, id: this.products.length + 1 };
    this.products.push(newProduct);
    this.productsSubject.next(this.products);
    this.saveProducts();
  }

  getOneSlug(slug: string): Observable<Product> {
    return this.productsSubject.asObservable().pipe(
      // Importa map desde 'rxjs/operators'
      map((products: Product[]) => {
        const prod = products.find(p => p.slug === slug);
        if (!prod) {
          throw new Error(`Producto con slug "${slug}" no encontrado.`);
        }
        return prod;
      })
    );
  }

  updateProduct(updated: Product): void {
    const idx = this.products.findIndex(p => p.id === updated.id);
    if (idx === -1) return;
    this.products[idx] = { ...updated };
    this.productsSubject.next(this.products);
    this.saveProducts();
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
    this.productsSubject.next(this.products);
    this.saveProducts();
  }
}
