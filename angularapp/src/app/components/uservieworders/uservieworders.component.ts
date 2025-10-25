import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_BASE_URL } from 'src/app/app.constants';
import { Order } from 'src/app/models/order.model';
import { Product } from 'src/app/models/product.model';
import { OrdersService } from 'src/app/services/order.service';

@Component({
  selector: 'app-uservieworders',
  templateUrl: './uservieworders.component.html',
  styleUrls: ['./uservieworders.component.css']
})
export class UserviewordersComponent implements OnInit {

  orders: Order[] = [];
  loading = false;
  error: string | null = null;
  expandedOrderId: number | null = null;
  selectedOrder: any = null;
  showOrderModal = false
  showSuccessMessage = false;
  userId: number = 0;


  constructor(private orderService: OrdersService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['userId'];
    this.orderService.getOrderByUserId(this.userId).subscribe(params => {
      this.orders = params;
      console.log(this.orders);
    })
  }

  loadOrders(): void {
    this.loading = true;
    this.error = null;
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
    })

  }

  toggleProducts(orderId: number): void {
    this.expandedOrderId = this.expandedOrderId === orderId ? null : orderId;
  }

  truncate(text: string | undefined, len = 140): string {
    if (!text) return '';
    return text.length > len ? text.slice(0, len) + '…' : text;
  }

  closeSuccessMessage() {
    this.showSuccessMessage = false;
  }

  confirmCancel(orderId: number): void {
    let index = this.orders.findIndex(p => p.orderId == orderId);
    this.orders.splice(index, 1);
    this.orderService.deleteOrder(orderId).subscribe(param => {
      this.loadOrders();
    })
    this.showSuccessMessage = true;

    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }

  cancelOrder(orderId: number): void {
    let index = this.orders.findIndex(p => p.orderId == orderId);
    this.orders.splice(index, 1);
    this.orderService.deleteOrder(orderId).subscribe(param => {
      this.loadOrders();
    })
    this.showSuccessMessage = true;

    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }


  viewOrder(order: any) {
    this.selectedOrder = order;
    this.showOrderModal = true;
    console.log(order);
    
    console.log("*view orders *",this.orders);

  }
  
  closeOrderModal() {
    this.showOrderModal = false;
    this.selectedOrder = null;
  }
}