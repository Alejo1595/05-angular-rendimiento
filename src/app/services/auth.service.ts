import { Injectable } from '@angular/core';
import { HttpClient, /* HttpHeaders */ } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { environment } from './../../environments/environment';
import { User } from '../model/user.model';
import { Auth } from '../model/auth';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.api_url}/api/auth`;
  private user = new BehaviorSubject<User | null>(null);

  public user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  public login(email: string, password: string): Observable<Auth> {
    return this.http.post<Auth>(`${this.url}/login`, { email, password })
      .pipe(
        tap(({ access_token }) => this.storageService.saveItem('token', access_token))
      );
  }

  public getProfile(): Observable<User> {
    return this.http.get<User>(`${this.url}/profile`)
      .pipe(
        tap((user: User) => {
          this.user.next(user);
          this.storageService.saveItem('user', user);
        })
      );
  }

  public loginAndGetProfile(email: string, password: string) {
    return this.login(email, password).pipe(switchMap(() => this.getProfile()))
  }

  public logout() {
    this.storageService.removeItem('token');
    this.storageService.removeItem('user');
    this.user.next(null);
  }
}
