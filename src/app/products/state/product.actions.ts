import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Product } from '../product.model';

export enum ProductActionTypes {
	LOAD_PRODUCTS = "[Product] Load Products",
	LOAD_PRODUCTS_SUCCESS = "[Product] Load Products Success",
	LOAD_PRODUCTS_FAIL = "[Product] Load Products Fail",

	LOAD_PRODUCT = "[Product] Load Product",
	LOAD_PRODUCT_SUCCESS = "[Product] Load Product Success",
	LOAD_PRODUCT_FAIL = "[Product] Load Product Fail",

	CREATE_PRODUCT = "[Product] Create Product",
	CREATE_PRODUCT_SUCCESS = "[Product] Create Product Success",
	CREATE_PRODUCT_FAIL = "[Product] Create Product Fail",

	UPDATE_PRODUCT = "[Product] Update Product",
	UPDATE_PRODUCT_SUCCESS = "[Product] Update Product Success",
	UPDATE_PRODUCT_FAIL = "[Product] Update Product Fail",

	DELETE_PRODUCT = "[Product] Delete Product",
	DELETE_PRODUCT_SUCCESS = "[Product] Delete Product Success",
	DELETE_PRODUCT_FAIL = "[Product] Delete Product Fail",

  ENABLE_EDIT_MODE = "[Product] Edit Mode Enabled",
  DISABLE_EDIT_MODE = "[Product] Edit Mode Disabled",
}

// Load Any Actions
export class LoadProducts implements Action {
	readonly type = ProductActionTypes.LOAD_PRODUCTS
}

export class LoadProductsSuccess implements Action {
	readonly type = ProductActionTypes.LOAD_PRODUCTS_SUCCESS

	constructor(public payload: Product[]) {}
}

export class LoadProductsFail implements Action {
	readonly type = ProductActionTypes.LOAD_PRODUCTS_FAIL

	constructor(public payload: string) {}
}

// Load One Actions
export class LoadProduct implements Action {
	readonly type = ProductActionTypes.LOAD_PRODUCT

	constructor(public payload: number) {}
}

export class LoadProductSuccess implements Action {
	readonly type = ProductActionTypes.LOAD_PRODUCT_SUCCESS

	constructor(public payload: Product) {}
}

export class LoadProductFail implements Action {
	readonly type = ProductActionTypes.LOAD_PRODUCT_FAIL

	constructor(public payload: string) {}
}


// Create Actions
export class CreateProduct implements Action {
	readonly type = ProductActionTypes.CREATE_PRODUCT

	constructor(public payload: Product) {}
}

export class CreateProductSuccess implements Action {
	readonly type = ProductActionTypes.CREATE_PRODUCT_SUCCESS

	constructor(public payload: Product) {}
}

export class CreateProductFail implements Action {
	readonly type = ProductActionTypes.CREATE_PRODUCT_FAIL

	constructor(public payload: string) {}
}


// Update Actions
export class UpdateProduct implements Action {
	readonly type = ProductActionTypes.UPDATE_PRODUCT

	constructor(public payload: Product) {}
}

export class UpdateProductSuccess implements Action {
	readonly type = ProductActionTypes.UPDATE_PRODUCT_SUCCESS

	constructor(public payload: Update<Product>) {}
}

export class UpdateProductFail implements Action {
	readonly type = ProductActionTypes.UPDATE_PRODUCT_FAIL

	constructor(public payload: string) {}
}

// Delete Actions
export class DeleteProduct implements Action {
	readonly type = ProductActionTypes.DELETE_PRODUCT

	constructor(public payload: number) {}
}

export class DeleteProductSuccess implements Action {
	readonly type = ProductActionTypes.DELETE_PRODUCT_SUCCESS

	constructor(public payload: number) {}
}

export class DeleteProductFail implements Action {
	readonly type = ProductActionTypes.DELETE_PRODUCT_FAIL

	constructor(public payload: string) {}
}


export class EnableEditMode implements Action {
  readonly type = ProductActionTypes.ENABLE_EDIT_MODE
}


export class DisableEditMode implements Action {
  readonly type = ProductActionTypes.DISABLE_EDIT_MODE
}

export type Action = 
LoadProducts | 
LoadProductsSuccess | 
LoadProductsFail | 
LoadProduct | 
LoadProductSuccess | 
LoadProductFail | 
CreateProduct | 
CreateProductSuccess | 
CreateProductFail | 
UpdateProduct | 
UpdateProductSuccess | 
UpdateProductFail | 
DeleteProduct | 
DeleteProductSuccess | 
DeleteProductFail |
EnableEditMode |
DisableEditMode;