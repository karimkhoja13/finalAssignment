import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableSort'
})
export class TableSortPipe implements PipeTransform {
  transform(array: any[], field: string): any[] {
    const order = 1; // 1 for ascending, -1 for descending
    return array.sort((a, b) => {
      const aValue = this.resolve(a, field);
      const bValue = this.resolve(b, field);
      return order * (aValue < bValue ? -1 : (aValue > bValue ? 1 : 0));
    });
  }

  private resolve(object: any, path: string): any {
    return path.split('.').reduce((o, p) => o && o[p], object);
  }
}

//   transform(list: any[], column: string): any[] {
//     let sortedArray = list.sort((a, b) => {
//       if (a[column] > b[column]) {
//         return 1;
//       }
//       if (a[column] < b[column]) {
//         return -1;
//       }
//       return 0;
//     });
//     return sortedArray;
//   }

// }
