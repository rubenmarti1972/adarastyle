import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';
import { Lookbook } from '../models/lookbook.model';

@Injectable({
  providedIn: 'root'
})
export class LookbookService {
  private apiService = inject(ApiService);
  private readonly endpoint = 'lookbooks';

  getActiveLookbooks(limit?: number): Observable<Lookbook[]> {
    const params: any = {
      filters: { isActive: { $eq: true } },
      sort: ['order:asc', 'publishDate:desc'],
      populate: ['coverImage', 'images', 'products.images']
    };

    if (limit) {
      params.pagination = { limit };
    }

    return this.apiService.get<any>(this.endpoint, params).pipe(
      map(response => response.data || [])
    );
  }

  getLookbookBySlug(slug: string): Observable<Lookbook> {
    return this.apiService.get<any>(this.endpoint, {
      filters: { slug: { $eq: slug } },
      populate: ['coverImage', 'images', 'products.images']
    }).pipe(
      map(response => response.data?.[0])
    );
  }
}
