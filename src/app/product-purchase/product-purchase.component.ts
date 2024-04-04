import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { IProductModel } from '../type/productModel';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { IProductPurchase } from '../type/productPurchase';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-product-purchase',
  standalone: true,
  imports: [ReactiveFormsModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatSelectModule,CommonModule,MatTableModule],
  templateUrl: './product-purchase.component.html',
  styleUrl: './product-purchase.component.css'
})
export class ProductPurchaseComponent {
  requestForm!: FormGroup;
  displayedColumns: string[] = ['id','productName','purchaseQuontity'];
  allProduct:IProductModel[]=[];
  allProductPurchase:IProductPurchase[]=[];
  availableValue!:number;
  isAvailable=false;
  fb=inject(FormBuilder);
  productService=inject(ProductService);
  router=inject(Router);
  constructor(
  ) {}

  ngOnInit(): void {
   this.getAllProductList();
   this.getAllPurchaseList();
   this.createForm();
  }

  getAllProductList(){
    this.productService.getProductList().subscribe(res=>{
      this.allProduct=res;
      console.log(this.allProduct,'this.allProduct');
    })
  }

  getAllPurchaseList(){
    this.productService.getPurchaseList().subscribe(res=>{
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
  this.productService.saveProductPurchase(this.requestForm.value).subscribe({
    next:(res)=>{
      console.log(res,'this.requestForm.value');
      this.getAllPurchaseList();
      this.resetForm();
    }
  })
  }

  resetForm(){
    this.requestForm.patchValue({
      productId: null,
      productName: null,
      purchaseQuontity: null
    })
  }
  createForm() {
    this.requestForm = this.fb.group({
      id: [0,[]],
      productId: [null, [Validators.required]],
      productName: [null, [Validators.required]],
      purchaseQuontity: [null, [Validators.required]]
    });
  }
}
