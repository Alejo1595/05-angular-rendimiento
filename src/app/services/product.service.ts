import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { catchError, Observable, retry, switchMap, throwError, zip } from 'rxjs';

import { environment } from './../../environments/environment';

import { Product, CreateProductDTO, UpdateProductDTO } from '../model/product.model';
import { checkTime } from './../interceptors/time.interceptor'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private urlProduct = `${environment.api_url}/api/products`;
  private urlCategory = `${environment.api_url}/api/categories`;

  constructor(private http: HttpClient) { }

  public getByPage = (limit?: number, offset?: number): Observable<Product[]> => {
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.urlProduct, { params, context: checkTime() })
      .pipe(
        retry(3),
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.BadRequest) {
            return throwError(() => `Algo salio mal desde el front ${error.message}`);
          }

          if (error.status === HttpStatusCode.InternalServerError) {
            return throwError(() => `Error interno en el servidor ${error.message}`);
          }

          if (error.status === HttpStatusCode.NotFound) {
            return throwError(() => `Producto no enconrtado ${error.message}`);
          }

          return throwError(() => `Algo salio mal ${error.message}`);
        })
      );
  }

  public getOne(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.urlProduct}/${id}`).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case HttpStatusCode.InternalServerError:
            return throwError(() => 'Algo esta fallando en el server');

          case HttpStatusCode.NotFound:
            return throwError(() => 'El producto no existe');

          default:
            return throwError(() => 'Upps algo salio mal');
        }
      }),
    );
  }

  public create = (dto: CreateProductDTO): Observable<Product> => this.http.post<Product>(this.urlProduct, dto, { context: checkTime() });

  public update = (id: number, dto: UpdateProductDTO): Observable<Product> => this.http.put<Product>(`${this.urlProduct}/${id}`, dto, { context: checkTime() })

  public delete = (id: number): Observable<boolean> => this.http.delete<boolean>(`${this.urlProduct}/${id}`, { context: checkTime() });

  public readAndUpdate = (id: number) => {
    this.http.get<Product>(`${this.urlProduct}/${id}`, { context: checkTime() })
      .pipe(
        switchMap(product => this.update(product.id,
          {
            title: 'Producto actualizado desde el servicio',
            price: 500
          }
        ))
      )
  }

  public fetchDeleteAndUpdate = (id: number): Observable<[boolean, Product]> => {
    return zip(
      this.delete(id),
      this.update(id, {
        title: 'Producto actualizado desde el servicio',
        price: 500
      })
    )
  }

  public getByCategory(categoryId: string, limit?: number, offset?: number) {
    let params = new HttpParams();

    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }

    return this.http.get<Product[]>(`${this.urlCategory}/${categoryId}/products`, { params });
  }
}
