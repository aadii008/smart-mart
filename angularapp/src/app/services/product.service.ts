import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { API_BASE_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = API_BASE_URL;

  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/api/products`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/api/products/category/${category}`);
  }

  getProductsByUserId(userId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/api/products/user/${userId}`);
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/api/products/${productId}`);
  }



  updateProduct(id: number, updatedProduct: Product, imageFile: File): Observable<Product> {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(updatedProduct)], { type: 'application/json' }));
    formData.append('image', imageFile);
    return this.http.put<Product>(`${this.baseUrl}/api/products/${id}`, formData);
  }

  updateStock(id:number, product:Product){
    return this.http.put<Product>(`${this.baseUrl}/api/products/stock/${id}`, product);
  }


  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/products/${id}`);
  }

  loadCart(): void {
    const cartData = localStorage.getItem('cart');
    const cart = cartData ? JSON.parse(cartData) : [];
    this.cartSubject.next(cart);
  }

  addToCart(product: any): void {
    const cart = this.cartSubject.getValue();
    const existing = cart.find((item: any) => item.productId === product.productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    this.updateLocalStorage(cart);
  }

  removeFromCart(product: any): void {
    let cart = this.cartSubject.getValue();
    cart = cart.filter((item: any) => item.productId !== product.productId);
    this.updateLocalStorage(cart);
  }
  
  removeAllFromCart(): void {
    this.updateLocalStorage([]);
  }

  updateLocalStorage(cart: any[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  addProduct(product: any, imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
    formData.append('image', imageFile);
    return this.http.post(`${this.baseUrl}/api/products/add`, formData);
  }
  getCategoryCounts(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/api/products/category-counts`);
  }
  

}
