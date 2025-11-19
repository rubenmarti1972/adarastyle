import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

    return this.apiService.get<FeaturedCollection[]>(this.endpoint, params);
  }

  getCollectionBySlug(slug: string): Observable<FeaturedCollection> {
    return this.apiService.get<FeaturedCollection[]>(this.endpoint, {
      filters: { slug: { $eq: slug } },
      populate: ['image', 'hoverImage', 'products.images', 'department']
    }).pipe(
      map(response => response[0])
    );
  }
}
