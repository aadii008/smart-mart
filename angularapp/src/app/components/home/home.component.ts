import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchField = ''
  products: any[] = [];

  categories = [
    { name: 'Electronics', image: 'assets/categories/e.jpg' },
    { name: 'Furniture', image: 'assets/categories/f.jpg' },
    { name: 'Clothing', image: 'assets/categories/c.jpg' },
    { name: 'Vegetables', image: 'assets/categories/v.jpg' },
    { name: 'Fruits', image: 'assets/categories/fr.jpg' }
  ];

bannerItems = [
  { image: 'assets/i1.jpg'},
  { image: 'assets/i2.jpg'},
  { image: 'assets/i3.jpg'},
  { image: 'assets/i4.jpg'},
];

  benefits = [
    { icon: 'bi bi-truck', title: 'Free Delivery', subtitle: 'on orders above ₹699' },
    { icon: 'bi bi-arrow-repeat', title: 'Easy Returns', subtitle: 'within 7 days' },
    { icon: 'bi bi-shop', title: 'Collect & Return', subtitle: 'at nearest store' }
  ];


  currentIndex = 0;
  intervalId: any;
  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.bannerItems.length;
    }, 3000);
    this.service.getProducts().subscribe(data => {
      this.products = data;
    })
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  constructor(private service: ProductService, private router: Router, private auth: AuthService) { }

  onCategories(category: any) {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['user', this.auth.getAuthenticatedUserId(), 'products', 'viewProducts', category.name])
    }
    else {
      this.router.navigate(['unknown', 'products', category.name])
    }

  }

}
