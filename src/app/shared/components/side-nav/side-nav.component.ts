import { DOCUMENT } from '@angular/common';
import { Component, Input, Inject } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  @Input()
  set openMenu(isOpen: boolean) {
    (isOpen)
      ? this.document.body.classList.add('overflow-hidden')
      : this.document.body.classList.remove('overflow-hidden');
    this.isMenuOpen = isOpen;
  }

  @Input()
  public toggleMenu!: () => void;

  @Input()
  public position: 'left' | 'right' = 'left';

  @Input()
  public isHiddenLgSizeScreen: boolean = true;

  public isMenuOpen: boolean = false;
}
