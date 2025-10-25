import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model'
import { API_BASE_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  

  private apiUrl = API_BASE_URL;

  constructor(private http: HttpClient) {}

  
  public placeOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/api/orders`, order);
  }

  
  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/orders/${id}`);
  }

 
  getOrderDetails(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/api/orders/${orderId}`);
  }

  
  getOrderByUserId(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/api/orders/user/${userId}`);
  }

  
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/api/orders`);
  }


  getOrderByOrderId(id : number) : Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/api/orders/${id}`);
  }

 
  updateOrderStatus(id: number, order: Partial<Order>): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/api/orders/${id}`, order);
  }

  getOrderCategoryCounts(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/api/orders/category-counts`);
  }
 


}
