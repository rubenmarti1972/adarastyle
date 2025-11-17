import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../models/department.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(private apiService: ApiService) {}

  getDepartments(): Observable<Department[]> {
    return this.apiService.get<Department[]>('departments', {
      populate: ['image'],
      sort: 'displayOrder:asc',
      filters: { isActive: { $eq: true } }
    });
  }

  getDepartmentBySlug(slug: string): Observable<Department> {
    return this.apiService.get<Department>('departments', {
      filters: { slug: { $eq: slug } },
      populate: ['image', 'subDepartments']
    });
  }

  getDepartmentById(id: number): Observable<Department> {
    return this.apiService.get<Department>(`departments/${id}`, {
      populate: ['image', 'subDepartments']
    });
  }
}
