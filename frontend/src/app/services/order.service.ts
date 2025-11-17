import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private apiService: ApiService) {}

  createOrder(orderData: any): Observable<any> {
    return this.apiService.post<any>('orders', orderData);
  }

  getOrder(orderNumber: string): Observable<Order> {
    return this.apiService.get<Order>(`orders/${orderNumber}`, {
      populate: ['items', 'items.product', 'invoice']
    });
  }

  updateOrderStatus(orderNumber: string, status: any): Observable<Order> {
    return this.apiService.put<Order>(`orders/${orderNumber}/status`, status);
  }
}
