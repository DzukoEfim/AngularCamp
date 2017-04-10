import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterCourses'
})

export class FilterCoursesPipe implements PipeTransform {

    transform(data, searchText: string) {
        if (!searchText) {
            console.log(data);
            return data;
        }

        return data.filter( (element: {title: string}) => {
            return element.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
        });
    }
}
