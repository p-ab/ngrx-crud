import { Injectable } from '@angular/core';
import {
	HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class Interceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const { url, method } = req;
		switch (true) {
			case environment.production:
				return next.handle(req);
			case method === 'GET' && url.endsWith('/all'):
				return getAll();
			case method === 'GET':
				return getById();
			case method === 'POST':
				return addProduct();
			case method === 'PUT':
				return editProduct();
			case method === 'DELETE':
				return deleteProduct();
			default:
				return next.handle(req);
		}

		function getAll() {
			return next.handle(req.clone({
				url: 'http://localhost:3000/products?_page=1&_limit=20'
			}));
		}
		function getById() {
			const id = idFromUrl();
			return next.handle(req.clone({
				url: `http://localhost:3000/products/${id}`
			}));
		}
		function addProduct() {
			return next.handle(req.clone({
				url: `http://localhost:3000/products`,
				method: 'POST'
			}));
		}
		function editProduct() {
			const id = idFromUrl();
			return next.handle(req.clone({
				url: `http://localhost:3000/products/${id}`,
				method: 'PUT'
			}));
		}
		function deleteProduct() {
			const id = idFromUrl();
			return next.handle(req.clone({
				url: `http://localhost:3000/products/${id}`,
				method: 'DELETE'
			}));
		}
        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
	}
}