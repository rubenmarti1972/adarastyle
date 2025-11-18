import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';
import { FeaturedCollection } from '../models/featured-collection.model';

@Injectable({
  providedIn: 'root'
})
export class FeaturedCollectionService {
  private apiService = inject(ApiService);
  private readonly endpoint = 'featured-collections';

  getActiveCollections(limit?: number): Observable<FeaturedCollection[]> {
    const params: any = {
      filters: { isActive: { $eq: true } },
      sort: ['order:asc'],
      populate: ['image', 'hoverImage', 'products', 'department']
    };

    if (limit) {
      params.pagination = { limit };
    }

    return this.apiService.get<any>(this.endpoint, params).pipe(
      map(response => response.data || [])
    );
  }

  getCollectionBySlug(slug: string): Observable<FeaturedCollection> {
    return this.apiService.get<any>(this.endpoint, {
      filters: { slug: { $eq: slug } },
      populate: ['image', 'hoverImage', 'products.images', 'department']
    }).pipe(
      map(response => response.data?.[0])
    );
  }
}
