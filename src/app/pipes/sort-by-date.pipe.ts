import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortByDate'
})

export class SortByDatePipe implements PipeTransform {

    transform(data) {
        return data.sort( (cur: {date: Date, topRated: boolean}, next: {date: Date}) =>  {
            return cur.topRated ? -1 : new Date(next.date).getTime() - new Date(cur.date).getTime();
    });
    }
}
