import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API_BASE_URL } from 'src/app/app.constants';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-userviewproduct',
  templateUrl: './userviewproduct.component.html',
  styleUrls: ['./userviewproduct.component.css']
})
export class UserviewproductComponent implements OnInit {
  products: Product[] = [];
  image = API_BASE_URL + '/api/products/image/'

  role:string|null=localStorage.getItem('role');

  constructor(private service: ProductService, private router: Router, private ar: ActivatedRoute) { }

  categories = ['All Categories', 'Electronics', 'Furniture', 'Clothing', 'Vegetables', 'Fruits'];
  selectedCategory = '';
  filteredProducts = [];
  ngOnInit(): void {
    this.service.getProducts().subscribe(params => {
      this.products = params;
      console.log(this.products);
      let cat = this.ar.snapshot.params['category'];
      if (cat != undefined) {
        this.selectedCategory = cat;
      }
      this.filterProducts();
      console.log(this.role);
    });
  }

  filterProducts() {
    if (this.selectedCategory.length > 0 && this.selectedCategory != 'All Categories') {
      this.service.getProducts().subscribe(param => {
        this.products = param;
        this.filteredProducts = this.products.filter(
          p => p.category === this.selectedCategory
        );
      })
    } else {
      this.filteredProducts = [...this.products];
    }
  }
  // addToCart(product: Product): void {
  //    this.service.addToCart(product);
  // }
  addToCart(product: any): void {
    this.service.addToCart(product);
      product.adding = true;
      setTimeout(() => {
        product.adding = false;
      }, 1000);
    }
  

}
