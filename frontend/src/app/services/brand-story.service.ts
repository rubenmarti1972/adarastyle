import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';
import { BrandStory } from '../models/brand-story.model';

@Injectable({
  providedIn: 'root'
})
export class BrandStoryService {
  private apiService = inject(ApiService);
  private readonly endpoint = 'brand-stories';

  getHomeStories(limit?: number): Observable<BrandStory[]> {
    const params: any = {
      filters: {
        isActive: { $eq: true },
        showOnHome: { $eq: true }
      },
      sort: ['order:asc'],
      populate: ['image']
    };

    if (limit) {
      params.pagination = { limit };
    }

    return this.apiService.get<any>(this.endpoint, params).pipe(
      map(response => response.data || [])
    );
  }

  getAllStories(): Observable<BrandStory[]> {
    return this.apiService.get<any>(this.endpoint, {
      filters: { isActive: { $eq: true } },
      sort: ['order:asc'],
      populate: ['image']
    }).pipe(
      map(response => response.data || [])
    );
  }
}
