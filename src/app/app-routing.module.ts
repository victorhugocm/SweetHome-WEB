import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { CreateOrderComponent } from './components/order/create-order/create-order.component';
import { ListProductComponent } from './components/product/list-product/list-product.component';
import { CreateProductComponent } from './components/product/create-product/create-product.component';
import { UpdateProductComponent } from './components/product/update-product/update-product.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'create-order', component: CreateOrderComponent },
  { path: 'list-product', component: ListProductComponent },
  { path: 'create-product', component: CreateProductComponent },
  { path: 'update-product', component: UpdateProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }