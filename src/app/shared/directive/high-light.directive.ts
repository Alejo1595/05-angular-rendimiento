import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighLight]'
})
export class HighLightDirective {

  @HostListener('mouseenter', ['$event'])
  public onMouseEnter(event: MouseEvent) {
    this.element.nativeElement.style.backgroundColor = 'cyan';
    console.log(event);
  }

  @HostListener('mouseleave')
  public onMouseLevae() {
    this.element.nativeElement.style.backgroundColor = 'yellow';
  }

  constructor(private element: ElementRef) { }

}
