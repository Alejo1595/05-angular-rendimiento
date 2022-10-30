import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage = environment.isLocalStorage ? localStorage : sessionStorage;

  public saveItem = (key: string, value: unknown): void => this.storage.setItem(key, JSON.stringify(value));

  public getItem = (key: string): any => JSON.parse(`${this.storage.getItem(key)}`);

  public removeItem = (key: string) => this.storage.removeItem(key);
}
