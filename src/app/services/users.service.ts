import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CreateUserDTO, User } from '../model/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = `${environment.api_url}/api/users`;

  constructor(private http: HttpClient) { }

  public create(dto: CreateUserDTO): Observable<User> {
    console.log(dto);
    return this.http.post<User>(this.url, dto);
  }

  public getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
}
