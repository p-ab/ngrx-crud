import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxCurrencyModule } from "ngx-currency";

import { EffectsModule, Actions } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { productReducer } from './state/product.reducer';
import { ProductEffect } from './state/product.effects';

import { ProductComponent } from './product/product.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';

const productRoutes: Routes = [
	{ path: "", component: ProductComponent }
]


const customCurrencyMaskConfig = {
    align: "left",
    allowNegative: false,
    allowZero: true,
    decimal: ",",
    precision: 0,
    prefix: "$ ",
    suffix: "",
    thousands: ",",
    nullable: true
};

@NgModule({
  declarations: [ProductComponent, ProductAddComponent, ProductEditComponent, ProductListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    RouterModule.forChild(productRoutes),
    StoreModule.forFeature("products", productReducer),
    EffectsModule.forFeature([ProductEffect])
  ]
})
export class ProductsModule { }
