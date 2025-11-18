import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { DepartmentService } from '../../services/department.service';
import { StoreConfigService } from '../../services/store-config.service';
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/product.model';
import { Department } from '../../models/department.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  config = this.storeConfigService.config;
  featuredProducts: Product[] = [];
  newArrivals: Product[] = [];
  bestsellers: Product[] = [];
  departments: Department[] = [];

  constructor(
    private productService: ProductService,
    private departmentService: DepartmentService,
    private storeConfigService: StoreConfigService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.productService.getFeaturedProducts(4).subscribe(products => {
      this.featuredProducts = products;
    });

    this.productService.getNewArrivals(4).subscribe(products => {
      this.newArrivals = products;
    });

    this.productService.getBestsellers(4).subscribe(products => {
      this.bestsellers = products;
    });

    this.departmentService.getDepartments().subscribe(departments => {
      this.departments = departments;
    });
  }

  getImageUrl(image: any): string {
    return this.apiService.getImageUrl(image);
  }

  getProductImage(product: Product): string {
    if (product.images && product.images.length > 0) {
      return this.getImageUrl(product.images[0]);
    }
    return '';
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  }
}
