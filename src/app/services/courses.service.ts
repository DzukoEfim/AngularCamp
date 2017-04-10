import { Injectable } from '@angular/core';
import { ICourse } from '../interfaces/course-interfaces/course-interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { FilterCoursesPipe } from '../pipes/filter-courses.pipe';

@Injectable()
export class CoursesService {
    private currentMaxId: number = 1;
    private courses: Array<ICourse> = [
        {
            id: 0,
            title: 'First Angular Course',
            date: new Date('2017-03-25'),
            duration: 120,
            topRated: true,
            description: 'Lorem ipsum dolor sit amet, mei at dolorum sensibus, ubique utroque quaerendum ' +
            'quo eu. Ad omnium aperiri evertitur sit, has id feugiat noluisse. Pri ne ullum elitr molestie, ' +
            'delicata ullamcorper nam ad. An duo vero tritani alienum, at mei habemus gubergren.'
        },
        {
            id: 1,
            title: 'First React Course',
            date: new Date('2017-4-25'),
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
            date: new Date('2016-4-25'),
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
            date: new Date('2017-4-31'),
            duration: 186,
            topRated: false,
            description: 'Cras sed sapien nec nisl lobortis sodales. Morbi ornare pellentesque luctus. ' +
            'Aenean porttitor pharetra risus eget interdum. Nullam molestie lacus fermentum purus auctor, non ' +
            'pulvinar felis posuere. Cras eget mi ex. Integer elementum sed sapien et varius. Cras eu ex lacinia, ' +
            'luctus enim eget, tristique mi. Nunc ut metus et justo tempus congue eu eget lectus.'
        }
    ];

    private _coursesObservable: BehaviorSubject<ICourse[]> = <BehaviorSubject<ICourse[]>> new BehaviorSubject(this.courses);
    private coursesObservable: Observable<ICourse[]> = this._coursesObservable.asObservable();

    constructor(private filterCoursePipe: FilterCoursesPipe) {
    }

    private incrementMaxId(): void {
        this.currentMaxId++;
    }

    private addCourse(course: ICourse): void {
        this.courses.unshift(course);
        this._coursesObservable.next(this.courses);
    }

    public getCoursesList(): Observable<ICourse[]> {
        return this.coursesObservable;
    }

    public createCourse(courseObject: ICourse): void {
        this.incrementMaxId();

        let newCourse: ICourse = {
            id: this.currentMaxId,
            title: courseObject.title,
            duration: courseObject.duration,
            description: courseObject.description,
            date: new Date()
        };

        this.addCourse(newCourse);
    }

    public updateCourse(courseObject: ICourse): void {
        let course = this.getCourseById(courseObject.id);
        course.title = courseObject.title;
        course.description = courseObject.description;
        course.duration = courseObject.duration;
        this._coursesObservable.next(this.courses);
    }

    public deleteCourse(id: number): void {
        let courseIndex = this.getCourseById(id);
        this.courses.splice(this.courses.indexOf(courseIndex), 1);
        this._coursesObservable.next(this.courses);
    }

    public getCourseById(id: number): any {
        if (this.courses.length === 0 ) { return void 0; }

        let elementIndex = this.courses.findIndex( (course: ICourse) => {
            return course.id === id;
        });

        return this.courses[elementIndex];
    }

    public filterCourses(filterText: string): void {
        this._coursesObservable.next(this.filterCoursePipe.transform(this.courses, filterText));
    }
}
