import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as productActions from '../state/product.actions';
import * as fromProduct from '../state/product.reducer';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;
  isSavingFailed = false;

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
    })
  }

  get title() { return this.productForm.get('title'); }
  get colors() { return this.productForm.get('colors'); }
  get price() { return this.productForm.get('price'); }
  get quantity() { return this.productForm.get('quantity'); }

  createProduct() {
    if (this.productForm.valid) {
        const newProduct: Product = {
          title: this.productForm.get('title').value,
          colors: this.productForm.get('colors').value,
          price: this.productForm.get('price').value,
          quantity: this.productForm.get('quantity').value
        }

        this._store.dispatch(new productActions.CreateProduct(newProduct));
        this.productForm.reset();
    } else {
      this.isSavingFailed = true;
      setTimeout(() => this.isSavingFailed = false, 2000);
    }
  }
}
