import { Component, OnInit } from '@angular/core';
import { API_BASE_URL } from 'src/app/app.constants';
import { Product } from 'src/app/models/product.model';
import { OrdersService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

declare var bootstrap: any;

@Component({
  selector: 'app-adminviewproduct',
  templateUrl: './adminviewproduct.component.html',
  styleUrls: ['./adminviewproduct.component.css']
})
export class AdminviewproductComponent implements OnInit {
  products = [];
  image: string = API_BASE_URL + '/api/products/image/'
  orders: any = [];
  productIds: any = [];
  categories = ['All Categories', 'Electronics', 'Furniture', 'Clothing', 'Vegetables', 'Fruits'];
  selectedCategory = '';
  filteredProducts = [];
  editingProduct: Product = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    photoImage: '',
    createdAt: new Date(),
    updatedAt: null,
    user: null
  };
  selectedFile: File | null = null;
  productToDelete: Product | null = null;
  updatePhoto: boolean = false;
  selectedFileName: string = 'Choose file';

  constructor(private service: ProductService,private orderService: OrdersService) { }
  ngOnInit(): void {
    this.service.getProducts().subscribe(param => {
      this.products = param;
      this.filterProducts();
    })

    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
      for(let order of this.orders){
        if(order.status != "DELIVERED"){
          for(let p of order.product){
            this.productIds.push(p.productId);
          }
        }  
      }
    })

  }

  filterProducts() {
    if (this.selectedCategory.length > 0 && this.selectedCategory != 'All Categories') {
      this.service.getProducts().subscribe(param => {
        this.products = param;
        this.filteredProducts = this.products.filter(
          p => p.category === this.selectedCategory
        );
        console.log(this.filterProducts);
      })
    } else {
      this.filteredProducts = [...this.products];
      console.log(this.filterProducts);
    }

  }

  editProduct(product: any) {
    this.editingProduct = { ...product };
    this.selectedFileName=product.photoImage;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.updatePhoto = true;
  
    if (this.selectedFile) {
      this.selectedFileName = this.selectedFile.name;
    }
  }
  

  async updateProduct() {
    this.editingProduct.updatedAt = new Date();
    if (!this.updatePhoto) {
      const imagePath = API_BASE_URL+ '/api/products/image/' + this.editingProduct.photoImage;
      this.selectedFile = await this.urlToFile(imagePath, this.editingProduct.photoImage, 'image/png/jpg');
    }

    this.service.updateProduct(this.editingProduct.productId, this.editingProduct, this.selectedFile).subscribe(params => {
      const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal')!);
      confirmationModal.show();
    })
  }

  async urlToFile(url: string, filename: string, mimeType: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: mimeType });
  }

  closeModals() {
    const confirmationModalEl = document.getElementById('confirmationModal');
    const confirmationModal = bootstrap.Modal.getInstance(confirmationModalEl!);
    confirmationModal?.hide();


    const editModalEl = document.getElementById('editModal');
    const editModal = bootstrap.Modal.getInstance(editModalEl!);
    editModal?.hide();


    this.cancelEdit();
    this.ngOnInit(); 
  }

  cancelEdit() {
    this.editingProduct = {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category: '',
      photoImage: '',
      createdAt: new Date(),
      updatedAt: null,
      user: null
    };
    this.selectedFile=null;
    this.selectedFileName='';
    this.updatePhoto=false;
  }

  openDeleteModal(product: Product) {
    this.productToDelete = product;
  }

  confirmDelete() {
    if (this.productToDelete && !this.productIds.includes(this.productToDelete.productId)) {
      this.service.deleteProduct(this.productToDelete.productId).subscribe(() => {
        this.productToDelete = null;
        this.ngOnInit();
      });
      window.location.reload();
    }
  }
  
}