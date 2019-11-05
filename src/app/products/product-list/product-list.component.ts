import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as productActions from '../state/product.actions';
import * as fromProduct from '../state/product.reducer';
import { Product } from '../product.model';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  error$: Observable<String>;
  loaded$: Observable<boolean>;

  constructor(private _store: Store<fromProduct.AppState>) { }

  ngOnInit() {
    this.loaded$ = this._store.select(fromProduct.getProductsLoaded)
  	this._store.dispatch(new productActions.LoadProducts())
  	this.products$ = this._store.pipe(select(fromProduct.getProducts))
    this.error$ = this._store.pipe(select(fromProduct.getError));
  }

  deleteProduct(product: Product) {
    if (confirm("Are You Sure You want to Delete this Product?")) {
      this._store.dispatch(new productActions.DisableEditMode());
      this._store.dispatch(new productActions.DeleteProduct(product.id));
    }
  }

  editProduct(product: Product) {
    this._store.dispatch(new productActions.LoadProduct(product.id))
    this._store.dispatch(new productActions.EnableEditMode());
  }
}
