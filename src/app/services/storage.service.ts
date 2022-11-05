import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  private getStorage() {
    if (isPlatformBrowser(this.platformId)) {
      return environment.isLocalStorage ? localStorage : sessionStorage;
    }

    return null;
  }

  private storage = this.getStorage();

  public saveItem = (key: string, value: unknown): void => {
    if (isPlatformBrowser(this.platformId)) {
      this.storage?.setItem(key, JSON.stringify(value))
    }
  };

  public getItem = (key: string): any => {
    if (isPlatformBrowser(this.platformId)) {
      JSON.parse(`${this.storage?.getItem(key)}`);
    }
  }

  public removeItem = (key: string) => {
    if (isPlatformBrowser(this.platformId)) {
      this.storage?.removeItem(key)
    }
  }
}
