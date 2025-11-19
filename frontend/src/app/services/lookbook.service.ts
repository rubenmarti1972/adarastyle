import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

    return this.apiService.get<Lookbook[]>(this.endpoint, params);
  }

  getLookbookBySlug(slug: string): Observable<Lookbook> {
    return this.apiService.get<Lookbook[]>(this.endpoint, {
      filters: { slug: { $eq: slug } },
      populate: ['coverImage', 'images', 'products.images']
    }).pipe(
      map(response => response[0])
    );
  }
}
