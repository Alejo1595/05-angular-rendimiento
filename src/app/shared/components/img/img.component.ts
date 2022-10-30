import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {

  @Input()
  set changeImage(newImage: string) {
    this.img = !newImage ? this.imageDefault : newImage;
  }

  @Input()
  public alt: string = '';

  @Input()
  public class: string = '';

  @Output()
  public isError = new EventEmitter<string>();

  public img: string = '';

  private imageDefault = 'https://ejemplocodigo.com/wp-content/themes/qaengine/img/default-thumbnail.jpg';

  public imageError = (): void => {
    this.isError.emit(this.img);
    this.img = this.imageDefault;
  };

}
