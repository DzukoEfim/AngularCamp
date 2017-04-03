import { Injectable } from '@angular/core';
import { ICourse } from '../interfaces/course-interfaces/course-interface';

@Injectable()
export class CoursesService {
    private currentMaxId: number = 1;
    private courses: Array<ICourse> = [
        {
            id: 0,
            title: 'First Angular Course',
            creatingDate: '2017-03-25',
            duration: 120,
            topRated: true,
            description: 'Lorem ipsum dolor sit amet, mei at dolorum sensibus, ubique utroque quaerendum ' +
            'quo eu. Ad omnium aperiri evertitur sit, has id feugiat noluisse. Pri ne ullum elitr molestie, ' +
            'delicata ullamcorper nam ad. An duo vero tritani alienum, at mei habemus gubergren.'
        },
        {
            id: 1,
            title: 'First React Course',
            creatingDate: '2017-5-25',
            duration: 54,
            topRated: false,
            description: 'Per cu dico salutatus, vel possit sanctus id, at augue consul pro. Ex ius modus dicat ' +
            'movet, vel an vitae sanctus omnesque. Ea persius voluptua adolescens vel. Mel ut laudem tibique ' +
            'probatus, dicant epicuri maluisset eu eos, ius fugit nobis ne. Eam id movet nominavi aliquando. ' +
            'Hinc prima ornatus no vel, an sea case lucilius deseruisse.'
        },
        {
            id: 3,
            title: 'Old Course',
            creatingDate: '2016-5-25',
            duration: 147,
            topRated: false,
            description: 'Cras sed sapien nec nisl lobortis sodales. Morbi ornare pellentesque luctus. ' +
            'Aenean porttitor pharetra risus eget interdum. Nullam molestie lacus fermentum purus auctor, non ' +
            'pulvinar felis posuere. Cras eget mi ex. Integer elementum sed sapien et varius. Cras eu ex lacinia, ' +
            'luctus enim eget, tristique mi. Nunc ut metus et justo tempus congue eu eget lectus.'
        },
        {
            id: 4,
            title: 'The most newest course',
            creatingDate: '2017-6-31',
            duration: 186,
            topRated: false,
            description: 'Cras sed sapien nec nisl lobortis sodales. Morbi ornare pellentesque luctus. ' +
            'Aenean porttitor pharetra risus eget interdum. Nullam molestie lacus fermentum purus auctor, non ' +
            'pulvinar felis posuere. Cras eget mi ex. Integer elementum sed sapien et varius. Cras eu ex lacinia, ' +
            'luctus enim eget, tristique mi. Nunc ut metus et justo tempus congue eu eget lectus.'
        }
    ];

    private incrementMaxId(): void {
        this.currentMaxId++;
    }

    private addCourse(course: ICourse): void {
        this.courses.unshift(course);
    }


    public getCoursesList(): Array<ICourse> {
        return this.courses;
    }

    public createCourse(courseObject: ICourse): void {
        this.incrementMaxId();

        let currentDate = new Date();

        let newCourse: ICourse = {
            id: this.currentMaxId,
            title: courseObject.title,
            duration: courseObject.duration,
            description: courseObject.description,
            creatingDate: `${currentDate.getFullYear()} - ${currentDate.getMonth()} - ${currentDate.getDay()}`
        };

        this.addCourse(newCourse);
    }

    public updateCourse(courseObject: ICourse): void {
        let course = this.getCourseById(courseObject.id);
        course.title = courseObject.title;
        course.description = courseObject.description;
        course.duration = courseObject.duration;
    }

    public deleteCourse(id: number): void {
        let courseIndex = this.getCourseById(id);
        this.courses.splice(this.courses.indexOf(courseIndex), 1);
    }

    public getCourseById(id: number): any {
        if (this.courses.length === 0 ) { return void 0; }

        let elementIndex = this.courses.findIndex( (course: ICourse) => {
            return course.id === id;
        });

        return this.courses[elementIndex];
    }
}
