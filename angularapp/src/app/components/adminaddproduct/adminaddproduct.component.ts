import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

declare var bootstrap: any;

@Component({
  selector: 'app-adminaddproduct',
  templateUrl: './adminaddproduct.component.html',
  styleUrls: ['./adminaddproduct.component.css']
})
export class AdminaddproductComponent implements OnInit {

  constructor(private productService: ProductService, private ar: ActivatedRoute) { }

  selectedFile: File | null = null;

  newProduct: any = {
    name: '',
    description: '',
    price: null,
    stock: null,
    category: '',
    photoImage: '',
    createdAt: new Date(),
    updatedAt: null,
    user: {}
  }

  categories = ['All Categories', 'Electronics', 'Furniture', 'Clothing', 'Vegetables', 'Fruits'];


  ngOnInit(): void {
    let id = this.ar.snapshot.params['userId'];
    this.newProduct.user.userId = id;
  }

  public addNewProduct(addForm: NgForm) {
    if (!this.selectedFile) {
      alert('Please select an image');
      return;
    }
    if (addForm.valid) {
      this.productService.addProduct(this.newProduct, this.selectedFile).subscribe({
        next: () => {
          const modalElement = document.getElementById('successModal');
          if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
          }
          addForm.reset();
          this.selectedFile = null;
        },
        error: (err) => {
          console.error('Error adding product:', err);
          alert('Failed to add product.');
        }
      });
    }
  }

  onFileSelected(event: any) {
    console.log(event)
    this.selectedFile = event.target.files[0];
  }

  reloadPage() {
    window.location.reload();
  }
}
