import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }

    return this.http.get<any>(`${this.apiUrl}/${endpoint}`, { params: httpParams }).pipe(
      map(response => this.extractData(response))
    );
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<any>(`${this.apiUrl}/${endpoint}`, data).pipe(
      map(response => this.extractData(response))
    );
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<any>(`${this.apiUrl}/${endpoint}`, data).pipe(
      map(response => this.extractData(response))
    );
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<any>(`${this.apiUrl}/${endpoint}`).pipe(
      map(response => this.extractData(response))
    );
  }

  private extractData(response: any): any {
    // Strapi devuelve datos en formato { data: {...}, meta: {...} }
    if (response && response.data !== undefined) {
      return response.data;
    }
    return response;
  }

  getImageUrl(image: any): string {
    if (!image) return '';

    const url = image?.url || image?.formats?.medium?.url || image?.formats?.small?.url;

    if (!url) return '';

    // Si la URL ya es completa, retornarla
    if (url.startsWith('http')) {
      return url;
    }

    // Caso contrario, agregar la URL base de Strapi
    return `${environment.strapiUrl}${url}`;
  }
}
