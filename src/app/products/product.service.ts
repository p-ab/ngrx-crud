import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { Product } from "./product.model";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  private productsUrl = "http://localhost:3000/products";

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsUrl}/all`);
  }

  getProductById(payload: number): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${payload}`);
  }

  createProduct(payload: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, payload);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.productsUrl}/${product.id}`,
      product
    );
  }

  deleteProduct(payload: number) {
    return this.http.delete(`${this.productsUrl}/${payload}`);
  }
}