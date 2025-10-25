import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { API_BASE_URL } from 'src/app/app.constants';
import { Feedback } from 'src/app/models/feedback.model';
import { Order } from 'src/app/models/order.model';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { OrdersService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {

  constructor(private feedbackService: FeedbackService, private orderService: OrdersService, private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['userId'];
    this.userService.getProfileById(this.userId).subscribe(params => {
      this.user = params;
      this.orderService.getOrderByUserId(this.userId).subscribe(params => {
        this.orders = params;

        this.orders = this.orders.filter(order => order.status === 'DELIVERED');
        const productIds = this.orders.reduce((acc, order) => {
          if (Array.isArray(order.product)) {
            order.product.forEach(p => acc.push(p.productId));
          }
          return acc;
        }, []);

        this.orderedProductIds = Array.from(new Set(productIds));

        this.orderedProductIds.forEach(id => {
          this.productService.getProductById(id).subscribe(product => {
            this.orderedProducts.push(product);
          });
        });
      });
    });

  }
  userId: number = 0;

  feedbackText: string = '';
  rating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];

  product: Product = null;
  user: User = null;
  orders: any = [];
  orderedProductIds: any = [];
  orderedProducts: Product[] = [];
  imageUrl = API_BASE_URL + '/api/products/image/';
  showModal = false;

  public setRating(value: number) {
    this.rating = value;
  }

  public feedbackModal(product: Product) {
    this.product = product;
    this.showModal = true;
  }
  public closeModal() {
    this.showModal = false;
  }
  public submitFeedback(feedbackForm: NgForm) {
    if (feedbackForm.valid) {
      const feedback: Feedback = {
        user: this.user,
        product: this.product,
        message: this.feedbackText,
        rating: this.rating
      }

      this.feedbackService.createFeedback(feedback).subscribe(params => {
        feedbackForm.resetForm();
        this.router.navigate([`/user/${this.userId}/feedbacks`]);

      })
    }

  }


}
