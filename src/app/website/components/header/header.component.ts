import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Categories } from '../../../model/categories.model';
import { User } from '../../../model/user.model';

import { AuthService } from '../../../services/auth.service';
import { CategoriesService } from '../../../services/categories.service';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userProfile: User | null = null;
  public isMenuOpen: boolean = false;
  public categories: Categories[] = [];

  constructor(
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router: Router,
    private storeService: StoreService,
  ) { }

  public get totalProductsSelected() {
    return this.storeService.getShoppingCar.length
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.authService.user$.subscribe(user => this.userProfile = user);
  }

  public toggleMenu = (): boolean => this.isMenuOpen = !this.isMenuOpen;

  public login = () => {
    this.authService
      .loginAndGetProfile('alejo@gmail.com', '123456')
      .subscribe(() => this.router.navigate(['/profile']));
  }

  public logout = () => {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  private getAllCategories(): void {
    this.categoriesService
      .getAll()
      .subscribe(categories => this.categories = categories);
  }


}
