import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortByDate'
})

export class SortByDatePipe implements PipeTransform {

    transform(data) {
        return data.sort( (cur: {creatingDate: Date, topRated: boolean}, next: {creatingDate: Date}) =>  {
            return cur.topRated ? -1 : new Date(next.creatingDate).getTime() - new Date(cur.creatingDate).getTime();
        });
    }
}
