import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/order.service';

@Component({
  selector: 'app-adminvieworders',
  templateUrl: './adminvieworders.component.html',
  styleUrls: ['./adminvieworders.component.css']
})
export class AdminviewordersComponent implements OnInit {

  orders = [];

  statuses = [
    'PENDING', 'ACCEPTED', 'PACKED', 'SHIPPED',
    'DELIVERED', 'OUT OF STOCK', 'OUT FOR DELIVERY', 'CANCELED'
  ];

  constructor(private service : OrdersService) {}

  ngOnInit() {
    this.service.getOrders().subscribe(params => {
      this.orders = params;
      console.log(this.orders)
    })
  }

  updateStatus(orderId: number, newStatus: string) {
    this.service.getOrderByOrderId(orderId).subscribe(params => {
      let order = params;
      order.status = newStatus;
      this.service.updateOrderStatus(orderId, order).subscribe(params => {
        this.ngOnInit();
      })
    })
  }
}