import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
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

    return this.apiService.get<BrandStory[]>(this.endpoint, params);
  }

  getAllStories(): Observable<BrandStory[]> {
    return this.apiService.get<BrandStory[]>(this.endpoint, {
      filters: { isActive: { $eq: true } },
      sort: ['order:asc'],
      populate: ['image']
    });
  }
}
