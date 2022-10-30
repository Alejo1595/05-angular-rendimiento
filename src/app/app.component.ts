import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  public title = 'componentes-servicios';

  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    const token = this.storageService.getItem('token');
    if (token) {
      this.authService.getProfile().subscribe()
    }
  }
}
