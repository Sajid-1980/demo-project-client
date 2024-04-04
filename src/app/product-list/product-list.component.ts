import { Component, Renderer2, inject } from '@angular/core';
import { IProductModel } from '../type/productModel';
import { ProductService } from '../product.service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatTableModule,MatButtonModule,RouterLink,MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  allProduct:IProductModel[]=[];
  displayedColumns: string[] = ['id', 'productName', 'productDescription', 'productQuontity','action'];
  productModel!:IProductModel ;
  productService=inject(ProductService);
  router=inject(Router);
  constructor(
  ) {}

  ngOnInit(): void {
   this.getAllProductList();
  }
  getAllProductList(){
    this.productService.getProductList().subscribe(res=>{
      this.allProduct=res;
      console.log(this.allProduct,'this.allProduct');
    })
  }

  getUpdateModal(model:any){
    this.productModel=model;
  }

  deleteModel(id:any){
    this.productService.deleteProduct(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.getAllProductList();
      }
    })
  }
  updateModel(id:any){
    this.router.navigateByUrl("/product-create/"+id)
  }
}
