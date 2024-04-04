import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProductModel } from './type/productModel';
import { IProductPurchase } from './type/productPurchase';
import { IProductSale } from './type/productSaley';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url='https://localhost:7103/api/Product'
  http=inject(HttpClient);
  constructor() { }

  getProductList(){
    return this.http.get<IProductModel[]>(this.url+'/GetAllProduct');
  }
  getPurchaseList(){
    return this.http.get<IProductPurchase[]>(this.url+'/GetAllPurchase');
  }
  getSaleList(){
    return this.http.get<IProductSale[]>(this.url+'/GetAllSale');
  }
  saveProduct(model: IProductModel){
    return this.http.post(this.url,model);
  }
  saveProductPurchase(model: IProductPurchase){
    return this.http.post(this.url+'/purchase',model);
  }
  saveProductSale(model: IProductSale){
    return this.http.post(this.url+'/sale',model);
  }
  getProduct(id:number){
    return this.http.get<IProductModel>(this.url+`/GetProduct/${id}`);
  }
  updateProduct(model: IProductModel){
    return this.http.put(this.url, model)
  }
  public deleteProduct(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
