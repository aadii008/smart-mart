import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API_BASE_URL } from 'src/app/app.constants';
import { Order } from 'src/app/models/order.model';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

declare var Razorpay: any;

@Component({
  selector: 'app-useraddcart',
  templateUrl: './useraddcart.component.html',
  styleUrls: ['./useraddcart.component.css']
})
export class UseraddcartComponent implements OnInit {

  cartItems: any[] = [];
  products: Product[] = [];
  address: string = '';
  order: Order;
  updatedStock: any = {};
  image = API_BASE_URL + '/api/products/image/'
  constructor(private productService: ProductService, private authService: AuthService, private orderService: OrdersService, private router: Router, private ar: ActivatedRoute) { }


  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });

    this.productService.loadCart();
    this.loadCartItems();

  }

  getTotalQuantity(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  getSubtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getGST(): number {
    return this.getSubtotal() * 0.12;
  }

  getTotalAmount(): number {
    return this.getSubtotal() + this.getGST();
  }
  getDiscountPercentage(item: any): string {
    if (!item.originalPrice || item.originalPrice <= item.price) {
      return '0';
    }
    const discount = ((item.originalPrice - item.price) / item.originalPrice) * 100;
    return discount.toFixed(0);
  }


  loadCartItems() {
    this.productService.cart$.subscribe((items: any[]) => {
      this.cartItems = items;
    });
  }

  removeItem(itemToRemove: any): void {
    this.productService.removeFromCart(itemToRemove);
  }


  increase(productId: number): void {
    const item = this.cartItems.find(c => c.productId === productId);
    if (item) {
      const updatedQuantity = item.quantity + 1;
      const updatedCart = updatedQuantity > 0
        ? this.cartItems.map(c =>
          c.productId === productId ? { ...c, quantity: updatedQuantity } : c
        )
        : this.cartItems.filter(c => c.productId !== productId);

      this.productService.updateLocalStorage(updatedCart);

    }
  }

  decrease(productId: number): void {
    const item = this.cartItems.find(c => c.productId === productId);
    if (item) {
      const updatedQuantity = item.quantity - 1;
      const updatedCart = updatedQuantity > 0
        ? this.cartItems.map(c =>
          c.productId === productId ? { ...c, quantity: updatedQuantity } : c
        )
        : this.cartItems.filter(c => c.productId !== productId);

      this.productService.updateLocalStorage(updatedCart);

    }
  }
  showSuccessPopup = false;
  placeOrder() {
    const orderedProductList = this.cartItems.map(item => {
      const { quantity, ...product } = item;
      return {
        product: {
          ...product
        },
        quantity: quantity
      };
    });

    let isStockValid: boolean = true;

    this.cartItems.forEach(item => {
      if (item.quantity > item.stock) {
        isStockValid = false;
        alert("Stock insufficient for product: " + item.name);
      }
    });

    if (isStockValid) {
      const totalQuantity = this.getTotalQuantity();
      const totalAmount = this.getTotalAmount();

      this.order = {
        user: {
          userId: this.authService.getAuthenticatedUserId()
        },
        product: orderedProductList.map(p => p.product),
        shippingAddress: this.address,
        totalAmount: totalAmount,
        quantity: totalQuantity,
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date()
      };


      orderedProductList.forEach(item => {
        const updatedProduct = {
          ...item.product,
          stock: item.product.stock - item.quantity
        };
        this.productService.updateStock(updatedProduct.productId, updatedProduct).subscribe(() => {
          console.log(`Stock updated for product: ${updatedProduct.name}`);
        });
      });


      console.log("Ordered products:", orderedProductList);

      this.orderService.placeOrder(this.order).subscribe(() => {

        this.productService.removeAllFromCart();
        this.showSuccessPopup = true;
      });
    }

  }
  closePopup() {
    this.showSuccessPopup = false;
  }

  payNow() {
    if (!this.address || this.cartItems.length === 0) {
      alert("Please enter a shipping address and add items to cart.");
      return;
    }

    const orderedProductList = this.cartItems.map(item => {
      const { quantity, ...product } = item;
      return {
        product: { ...product },
        quantity: quantity
      };
    });

    const totalQuantity = this.getTotalQuantity();
    const totalAmount = this.getTotalAmount();

    this.order = {
      user: {
        userId: this.authService.getAuthenticatedUserId()
      },
      product: orderedProductList.map(p => p.product),
      shippingAddress: this.address,
      totalAmount: totalAmount,
      quantity: totalQuantity,
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Place order first to get orderId
    this.orderService.placeOrder(this.order).subscribe((placedOrder: any) => {
      const orderId = placedOrder.orderId; // Adjust based on your backend response

      // Call backend to create Razorpay order
      this.authService.setUpRazorpay(orderId).subscribe((razorpayOrder: any) => {
        const options = {
          key: 'rzp_test_RTMgS87tLLgR22', // Replace with your Razorpay key
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: 'Smart Mart',
          description: 'Order Payment',
          order_id: razorpayOrder.id,
          handler: (response: any) => {
            alert('Payment successful! Razorpay Payment ID: ' + response.razorpay_payment_id);
            this.productService.removeAllFromCart();
            this.showSuccessPopup = true;
          },
          prefill: {
            name: 'Pranjal Singh',
            email: 'pranjalsingh05092002@example.com',
            contact: '8840911494'
          },
          theme: {
            color: '#3399cc'
          }
        };

        const rzp = new Razorpay(options);
        rzp.open();
        this.showSuccessPopup = true;
      });
    });
  }

}
