import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { map, Observable } from 'rxjs';
import { Categories } from '../model/categories.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private urlCategory = `${environment.api_url}/api/categories`;

  constructor(private http: HttpClient) { }

  public getAll = (limit?: number, offset?: number): Observable<Categories[]> => {
    let params = new HttpParams();

    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }

    return this.http.get<Categories[]>(this.urlCategory, { params })
      .pipe(
        map(categories => [{ id: '-1', name: 'home', }, ...categories])
      );
  }
}
