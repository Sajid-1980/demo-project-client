import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProductModel } from '../type/productModel';
import { ProductService } from '../product.service';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule,MatButtonModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {
  requestForm!: FormGroup;
  product!:IProductModel;
  productId!:number;
  allProduct:IProductModel[]=[];
  fb=inject(FormBuilder);
  productService=inject(ProductService);
  router=inject(Router);
  route=inject(ActivatedRoute);
  isEdit=false;
  constructor(
  ) {}
  ngOnInit(): void {
    this.productId=this.route.snapshot.params['id'];
    if(this.productId){
      this.isEdit=true;
      this.productService.getProduct(this.productId).subscribe(result=>{
        this.requestForm.patchValue(result);
      })
    }
    this.createForm();
  }

  saveForm(){
    this.productService.saveProduct(this.requestForm.value).subscribe({
      next:(res)=>{
        this.router.navigateByUrl('');
        this.requestForm.updateValueAndValidity();
      }
    })
  }
  restartForm(){
    this.requestForm.patchValue({
      productName: null,
      productDescription: null,
      productQuontity:  null
    })
    this.requestForm.updateValueAndValidity();
  }
editProduct(){
  this.productService.updateProduct(this.requestForm.value).subscribe({
    next:(res)=>{
      this.router.navigateByUrl('');
      this.requestForm.updateValueAndValidity();
    }
  })
}
  createForm() {
    this.requestForm = this.fb.group({
      id: [0,[]],
      productName: [null, [Validators.required]],
      productDescription: [null, [Validators.required]],
      productQuontity: [null, [Validators.required]]
    });
  }
}
