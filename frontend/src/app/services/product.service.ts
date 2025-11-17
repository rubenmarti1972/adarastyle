import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private apiService: ApiService) {}

  getProducts(filters?: any): Observable<Product[]> {
    const params: any = {
      populate: ['images', 'department'],
      sort: 'createdAt:desc'
    };

    if (filters) {
      if (filters.department) {
        params['filters[department][slug][$eq]'] = filters.department;
      }
      if (filters.featured) {
        params['filters[isFeatured][$eq]'] = true;
      }
      if (filters.newArrival) {
        params['filters[isNewArrival][$eq]'] = true;
      }
      if (filters.bestseller) {
        params['filters[isBestseller][$eq]'] = true;
      }
      if (filters.search) {
        params['filters[$or][0][name][$containsi]'] = filters.search;
        params['filters[$or][1][description][$containsi]'] = filters.search;
      }
    }

    return this.apiService.get<Product[]>('products', params);
  }

  getProductBySlug(slug: string): Observable<Product> {
    return this.apiService.get<Product>(`products`, {
      filters: { slug: { $eq: slug } },
      populate: ['images', 'department', 'relatedProducts']
    });
  }

  getProductById(id: number): Observable<Product> {
    return this.apiService.get<Product>(`products/${id}`, {
      populate: ['images', 'department', 'relatedProducts']
    });
  }

  getFeaturedProducts(limit: number = 8): Observable<Product[]> {
    return this.apiService.get<Product[]>('products', {
      filters: { isFeatured: { $eq: true } },
      populate: ['images', 'department'],
      pagination: { limit }
    });
  }

  getNewArrivals(limit: number = 8): Observable<Product[]> {
    return this.apiService.get<Product[]>('products', {
      filters: { isNewArrival: { $eq: true } },
      populate: ['images', 'department'],
      pagination: { limit },
      sort: 'createdAt:desc'
    });
  }

  getBestsellers(limit: number = 8): Observable<Product[]> {
    return this.apiService.get<Product[]>('products', {
      filters: { isBestseller: { $eq: true } },
      populate: ['images', 'department'],
      pagination: { limit },
      sort: 'rating:desc'
    });
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.apiService.get<Product[]>('products', {
      filters: {
        $or: [
          { name: { $containsi: query } },
          { description: { $containsi: query } },
          { tags: { $containsi: query } }
        ]
      },
      populate: ['images', 'department']
    });
  }
}
