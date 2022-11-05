import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'memoize',
})
export class MemoizePipe implements PipeTransform {

  transform(value: number): number {
    console.log('Llamado', value);
    return fibonacci(value);
  }

}

const fibonacci = (num: number): number => {
  if (num === 1 || num === 2) {
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
};
