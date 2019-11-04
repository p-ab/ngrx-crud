import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs'

import * as productActions from '../state/product.actions';
import * as fromProduct from '../state/product.reducer';
import { Product } from '../product.model';

declare const $: any;

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  productForm: FormGroup;
  isEditing = false;
  isEditingSuccess = false;
  isEditingFail = false;

  private _subscriptions: Subscription = new Subscription();

  constructor(
      private _fb: FormBuilder,
      private _store: Store<fromProduct.AppState>
    ) { }

  ngOnInit() {
    this.productForm = this._fb.group({
      title: ['', [
        Validators.required, 
        Validators.minLength(5),
        Validators.maxLength(32)
        ]
      ],
      colors: '',
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      id: null
    })

    const isEditing$: Observable<boolean> = this._store.select(
      fromProduct.checkEditMode
    )

    const product$: Observable<Product> = this._store.select(
      fromProduct.getCurrentProduct
    )

    this._subscriptions.add(
      isEditing$.subscribe(isEditing => this.isEditing = isEditing)
    )

    this._subscriptions.add(
      product$.subscribe(currentProduct => {
        if (currentProduct) {
          this.isEditing = true;
          this.productForm.patchValue({
            title: currentProduct.title,
            colors: currentProduct.colors,
            price: currentProduct.price,
            quantity: currentProduct.quantity,
            id: currentProduct.id
          })
          $('select').selectpicker('render');
        }
      })
    )
  }

  get title() { return this.productForm.get('title'); }
  get colors() { return this.productForm.get('colors'); }
  get price() { return this.productForm.get('price'); }
  get quantity() { return this.productForm.get('quantity'); }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  updateProduct() {
    if (this.productForm.valid) {
      const updatedProduct: Product = {
        title: this.productForm.get('title').value,
        colors: this.productForm.get('colors').value,
        price: this.productForm.get('price').value,
        quantity: this.productForm.get('quantity').value,
        id: this.productForm.get('id').value
      }

      this._store.dispatch(new productActions.UpdateProduct(updatedProduct));
      this.isEditingSuccess = true;
      setTimeout(() => {
        this.isEditingSuccess = false;
        this._store.dispatch(new productActions.DisableEditMode());
      }, 1500)
    } else {
      this.isEditingFail = true;
      setTimeout(() => this.isEditingFail = false, 2000);
    }
  }
}
