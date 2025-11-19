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
      httpParams = this.buildStrapiParams(params);
    }

    return this.http.get<any>(`${this.apiUrl}/${endpoint}`, { params: httpParams }).pipe(
      map(response => this.extractData(response))
    );
  }

  private buildStrapiParams(params: any): HttpParams {
    let httpParams = new HttpParams();

    Object.keys(params).forEach(key => {
      const value = params[key];

      if (value === null || value === undefined) {
        return;
      }

      // Handle arrays - Strapi 5 requires indexed notation for populate
      if (Array.isArray(value)) {
        if (key === 'populate') {
          // Para populate, usar notación con índices: populate[0]=image&populate[1]=mobileImage
          value.forEach((item, index) => {
            httpParams = httpParams.set(`${key}[${index}]`, item);
          });
        } else if (key === 'sort') {
          // Para sort, solo agregar múltiples veces
          value.forEach(item => {
            httpParams = httpParams.append(key, item);
          });
        } else {
          // Otros arrays
          value.forEach(item => {
            httpParams = httpParams.append(key, item);
          });
        }
      }
      // Handle objects (like filters, pagination)
      else if (typeof value === 'object') {
        httpParams = this.appendNestedParams(httpParams, key, value);
      }
      // Handle primitive values
      else {
        httpParams = httpParams.set(key, value.toString());
      }
    });

    return httpParams;
  }

  private appendNestedParams(params: HttpParams, prefix: string, obj: any): HttpParams {
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      const paramKey = `${prefix}[${key}]`;

      if (value === null || value === undefined) {
        return;
      }

      if (typeof value === 'object' && !Array.isArray(value)) {
        params = this.appendNestedParams(params, paramKey, value);
      } else {
        params = params.set(paramKey, value.toString());
      }
    });

    return params;
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
