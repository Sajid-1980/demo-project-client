import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProductModel } from '../type/productModel';
import { IProductSale } from '../type/productSaley';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-product-sale',
  standalone: true,
  imports: [ReactiveFormsModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatSelectModule,CommonModule,MatTableModule],
  templateUrl: './product-sale.component.html',
  styleUrl: './product-sale.component.css'
})
export class ProductSaleComponent {
  requestForm!: FormGroup;
  displayedColumns: string[] = ['id','productName','saleQuontity'];
  allProduct:IProductModel[]=[];
  allProductPurchase:IProductSale[]=[];
  availableValue!:number;
  isAvailable=false;
  fb=inject(FormBuilder);
  productService=inject(ProductService);
  router=inject(Router);
  constructor(
  ) {}

  ngOnInit(): void {
   this.getAllProductList();
   this.getAllSaleList();
   this.createForm();
  }

  getAllProductList(){
    this.productService.getProductList().subscribe(res=>{
      this.allProduct=res;
      console.log(this.allProduct,'this.allProduct');
    })
  }

  getAllSaleList(){
    this.productService.getSaleList().subscribe(res=>{
      this.allProductPurchase=res;
      console.log(this.allProductPurchase,'this.allProduct');
    })
  }

  getvalue(model:IProductModel){
    console.log(model,'model');
    this.availableValue=model.productQuontity;
    this.requestForm.patchValue({
      productName:model.productName,
      productId:model.id
    })
    this.isAvailable=true;
  }

  saveProductPurchase(){
  console.log(this.requestForm.value,'get all value');
  this.productService.saveProductSale(this.requestForm.value).subscribe({
    next:(res)=>{
      console.log(res,'this.requestForm.value');
      this.getAllSaleList();
      this.resetForm();
    }
  })
  }
  resetForm(){
    this.requestForm.patchValue({
      productId: null,
      productName: null,
      saleQuontity: null
    })
  }
  createForm() {
    this.requestForm = this.fb.group({
      id: [0,[]],
      productId: [null, [Validators.required]],
      productName: [null, [Validators.required]],
      saleQuontity: [null, [Validators.required]]
    });
  }
}
