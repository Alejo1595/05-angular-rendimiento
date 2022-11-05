import { Component, OnInit } from '@angular/core';
import { GeneratorService } from '../../../services/generator.service';
import { Random } from '../../../model/Random.model';

const names = ['Julian', 'Daniela', 'Alejandro', 'Fernanda'];

@Component({
  selector: 'app-optimization',
  templateUrl: './optimization.component.html',
  styleUrls: ['./optimization.component.scss'],
})
export class OptimizationComponent implements OnInit {

  public listA: Random[] = [];
  public listB: Random[] = [];

  constructor(private generatorService: GeneratorService) { }

  ngOnInit(): void {
    this.listA = this.generatorService.generate(names, [10, 20], 10);
    this.listB = this.generatorService.generate(names, [10, 20], 10);
  }

  public addNewItemList = (isListA: boolean, label: string) => {
    const newItem = { label, num: this.generatorService.generateNumber([10, 20]) };

    if (isListA) {
      this.listA = [newItem, ...this.listA];
      return;
    }

    this.listB = [newItem, ...this.listB];
  }
}
