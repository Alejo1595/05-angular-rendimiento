import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Random } from '../../../model/Random.model';

@Component({
  selector: 'app-random-list',
  templateUrl: './random-list.component.html',
  styleUrls: ['./random-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RandomListComponent {

  @Input()
  public title: string = '';

  @Input()
  public randomList: Random[] = [];

  @Output()
  public add = new EventEmitter<string>();

  public label: string = '';

  public addNewItem = () => {
    this.add.emit(this.label);
    this.label = "";
  }
}
