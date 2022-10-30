import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Categories } from '../../../model/categories.model';

@Component({
  selector: 'app-items-menu',
  templateUrl: './items-menu.component.html',
  styleUrls: ['./items-menu.component.scss']
})
export class ItemsMenuComponent {

  @Input()
  public categories: Categories[] = [];

  @Input()
  public isVertical: boolean = false;

  @Output()
  public isCloseMenu = new EventEmitter();


  public closeMenu = () => this.isCloseMenu.emit();
}
