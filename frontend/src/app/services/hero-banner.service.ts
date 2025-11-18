import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';
import { HeroBanner } from '../models/hero-banner.model';

@Injectable({
  providedIn: 'root'
})
export class HeroBannerService {
  private apiService = inject(ApiService);
  private readonly endpoint = 'hero-banners';

  getActiveBanners(): Observable<HeroBanner[]> {
    return this.apiService.get<any>(this.endpoint, {
      filters: { isActive: { $eq: true } },
      sort: ['order:asc'],
      populate: ['image', 'mobileImage']
    }).pipe(
      map(response => response.data || [])
    );
  }

  getBannerById(id: string): Observable<HeroBanner> {
    return this.apiService.get<any>(`${this.endpoint}/${id}`, {
      populate: ['image', 'mobileImage']
    }).pipe(
      map(response => response.data)
    );
  }
}
