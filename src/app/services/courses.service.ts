import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Response } from '@angular/http';

import { AuthorizedHttpService } from '../shared/services/authorized-http.service';

import { ICourse } from '../interfaces/course-interfaces/course-interface';

@Injectable()
export class CoursesService {
    private _coursesObservable: BehaviorSubject<{newCourses: ICourse[], totalCount: number}> =
            <BehaviorSubject<{newCourses: ICourse[], totalCount: number}>> new BehaviorSubject({newCourses: [], totalCount: 0});
    private coursesObservable: Observable<{newCourses: ICourse[], totalCount: number}> = this._coursesObservable.asObservable();

    private courseSearchText: string = '';
    private currentStep: number;
    private coursesOnPage: number;
    private createCourseURL: string = 'http://localhost:3000/courses';

    constructor(
        private http: AuthorizedHttpService
    ) {

    }

    public updateCourseSearchText(searchText: string): void {
        this.courseSearchText = searchText;
    }

    public fetchCourses(pageNumber: number, coursesOnPage: number) {
        this.http.get(this.getCoursesUrl(pageNumber, coursesOnPage))
            .map( (res: Response) => { return res.json(); })
            .subscribe(
                res => {
                    this.currentStep = pageNumber;
                    this.coursesOnPage = coursesOnPage;
                    this._coursesObservable.next(res);
                }
            );
    }

    public deleteCourse(courseId: number): void {
        this.http.deleteModel(this.getIdSpecificCoursesUrl(courseId))
            .map( (res: Response) => {return res.json()})
            .subscribe(
                (res) => {
                    if (res.success) {
                        this.fetchCourses(this.currentStep, this.coursesOnPage);
                    }
                }
            )
    }

    public getCoursesList(pageNumber: number, coursesOnPage: number): Observable<{newCourses: ICourse[], totalCount: number}> {
        this.fetchCourses(pageNumber, coursesOnPage);
        return this.coursesObservable;
    }

    public createCourse(courseObject: ICourse): void {
        let newCourse: ICourse = {
            title: courseObject.title,
            duration: courseObject.duration,
            description: courseObject.description,
            date: new Date()
        };

        this.http.post(this.createCourseURL, newCourse)
            .map( ( res: Response ) => { return res.json; })
            .subscribe(
                () => {
                    this.fetchCourses(this.currentStep, this.coursesOnPage);
                }
            );
    }

    public updateCourse(courseObject: ICourse): void {
        console.log(courseObject);
        this.http.put(this.getIdSpecificCoursesUrl(courseObject.id), courseObject)
            .map( (res: Response) => { return res.json()})
            .subscribe(
                (res) => {
                    if (res.success) {
                        this.fetchCourses(this.currentStep, this.coursesOnPage);
                    }
                }
            )
        // let course = this.getCourseById(courseObject.id);
        // course.title = courseObject.title;
        // course.description = courseObject.description;
        // course.duration = courseObject.duration;
        // // this.notifyStreams();
    }

    // public deleteCourse(id: number): void {
    //     let courseIndex = this.getCourseById(id);
    //     this.courses.splice(this.courses.indexOf(courseIndex), 1);
    //     // this.notifyStreams();
    // }

    // public getCourseById(id: number): any {
    //     if (this.courses.length === 0 ) { return void 0; }
    //
    //     let elementIndex = this.courses.findIndex( (course: ICourse) => {
    //         return course.id === id;
    //     });
    //
    //     return this.courses[elementIndex];
    // }

    private getCoursesUrl(pageNumber: number, coursesOnPage: number): string {
        return `http://localhost:3000/courses?pageNumber=${pageNumber}&coursesOnPage=${coursesOnPage}&searchText=${this.courseSearchText}`;
    }

    private getIdSpecificCoursesUrl(id: number): string {
        return `http://localhost:3000/courses/${id}`;
    }
}
