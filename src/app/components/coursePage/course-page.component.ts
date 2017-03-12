import { Component } from '@angular/core';
import { ICourse } from '../../interfaces/course-interfaces/course-interface';

@Component({
    selector: 'course-page',
    styleUrls: ['./course-page.component.css'],
    templateUrl: './course-page.component.html'
})

export class CoursePageComponent {
    courses: ICourse[];
    searchText: string;
    // onCourseSearch: ($event: Object) => ICourse[];

    constructor() {
        console.log(this.courses);
        this.courses = [
            {
                id: 0,
                title: 'First Angular Course',
                creatingDate: '2017-03-12',
                duration: '1h 20m',
                description: 'Lorem ipsum dolor sit amet, mei at dolorum sensibus, ubique utroque quaerendum ' +
                'quo eu. Ad omnium aperiri evertitur sit, has id feugiat noluisse. Pri ne ullum elitr molestie, ' +
                'delicata ullamcorper nam ad. An duo vero tritani alienum, at mei habemus gubergren.'
            },
            {
                id: 1,
                title: 'First React Course',
                creatingDate: '2016-12-25',
                duration: '1h 34m',
                description: 'Per cu dico salutatus, vel possit sanctus id, at augue consul pro. Ex ius modus dicat ' +
                'movet, vel an vitae sanctus omnesque. Ea persius voluptua adolescens vel. Mel ut laudem tibique ' +
                'probatus, dicant epicuri maluisset eu eos, ius fugit nobis ne. Eam id movet nominavi aliquando. ' +
                'Hinc prima ornatus no vel, an sea case lucilius deseruisse.'
            }];
    }

    public onCourseSearch() {
        let filteredArray: ICourse[] = [];

        if (this.searchText === '') {
            return filteredArray;
        }

        for (let course of this.courses) {
            if (course.title.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1) {
                filteredArray.push(course);
            }
        }
        return filteredArray;
    }

    public onCourseClear() {
        this.searchText = '';
    }
}
