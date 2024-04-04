import { Routes } from '@angular/router';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductPurchaseComponent } from './product-purchase/product-purchase.component';
import { ProductSaleComponent } from './product-sale/product-sale.component';

export const routes: Routes = [

  {
    path: 'product-create',
    component: ProductCreateComponent
  },
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'product-create/:id',
    component: ProductCreateComponent
  },
  {
    path: 'product-purchase',
    component: ProductPurchaseComponent
  },
  {
    path: 'product-sale',
    component: ProductSaleComponent
  },
];
