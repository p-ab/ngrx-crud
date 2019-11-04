import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { ProductService } from '../product.service';
import * as productActions from './product.actions';
import { Product } from '../product.model';

@Injectable()
export class ProductEffect {

	constructor(
		private _actions$: Actions,
		private _productService: ProductService
	) {}

	@Effect()
	loadProducts$: Observable<Action> = this._actions$.pipe(
		ofType<productActions.LoadProducts>(
				productActions.ProductActionTypes.LOAD_PRODUCTS
			),
		mergeMap((actions: productActions.LoadProducts) => 
			this._productService.getProducts().pipe(
				map((products: Product[]) => 
					new productActions.LoadProductsSuccess(products)
				),
				catchError(err => of(new productActions.LoadProductsFail(err)))
			)
		)
	)

	@Effect()
	loadProduct$: Observable<Action> = this._actions$.pipe(
		ofType<productActions.LoadProduct>(
				productActions.ProductActionTypes.LOAD_PRODUCT
			),
		mergeMap((action: productActions.LoadProduct) => 
			this._productService.getProductById(action.payload).pipe(
				map((product: Product) => 
					new productActions.LoadProductSuccess(product)
				),
				catchError(err => of(new productActions.LoadProductFail(err)))
			)
		)
	)

	@Effect()
	createProduct$: Observable<Action> = this._actions$.pipe(
		ofType<productActions.CreateProduct>(
				productActions.ProductActionTypes.CREATE_PRODUCT
			),
		map((action: productActions.CreateProduct) => action.payload),
		mergeMap((product: Product) => 
			this._productService.createProduct(product).pipe(
				map((newProduct: Product) => 
					new productActions.CreateProductSuccess(newProduct)
				),
				catchError(err => of(new productActions.CreateProductFail(err)))
			)
		)
	)

	@Effect()
	updateProduct$: Observable<Action> = this._actions$.pipe(
		ofType<productActions.UpdateProduct>(
				productActions.ProductActionTypes.UPDATE_PRODUCT
			),
		map((action: productActions.UpdateProduct) => action.payload),
		mergeMap((product: Product) => 
			this._productService.updateProduct(product).pipe(
				map((updatedProduct: Product) => 
					new productActions.UpdateProductSuccess({
						id: updatedProduct.id,
						changes: updatedProduct
					})
				),
				catchError(err => of(new productActions.UpdateProductFail(err)))
			)
		)
	)

	@Effect()
	deleteProduct$: Observable<Action> = this._actions$.pipe(
		ofType<productActions.DeleteProduct>(
				productActions.ProductActionTypes.DELETE_PRODUCT
			),
		map((action: productActions.DeleteProduct) => action.payload),
		mergeMap((id: number) => 
			this._productService.deleteProduct(id).pipe(
				map(() => new productActions.DeleteProductSuccess(id)),
				catchError(err => of(new productActions.DeleteProductFail(err)))
			)
		)
	)
}