import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { AuthorizedHttpService } from '../shared/services/authorized-http.service';
import { ICourse } from '../interfaces/course-interfaces/course-interface';
import { CoursesActions } from '../actions/coursesActions';

@Injectable()
export class CoursesService {
    // private _coursesObservable: BehaviorSubject<{newCourses: ICourse[], totalCount: number}> =
    //         <BehaviorSubject<{newCourses: ICourse[], totalCount: number}>> new BehaviorSubject({newCourses: [], totalCount: 0});
    // private coursesObservable: Observable<{newCourses: ICourse[], totalCount: number}> = this._coursesObservable.asObservable();

    private _singleCourseObservable: BehaviorSubject<ICourse>  = <BehaviorSubject<any>> new BehaviorSubject(null);
    private singleCourseObservable: Observable<ICourse> = this._singleCourseObservable.asObservable();

    private createCourseURL: string = 'http://localhost:3000/courses';
    // private getAllCoursesURL: string = 'http://localhost:3000/coursesAll';

    constructor(
        private http: AuthorizedHttpService,
        private router: Router,
        private coursesActions: CoursesActions
    ) {

    }

    public getTitleById(id: number): string | number {
        let title = '';

        this.singleCourseObservable
            .map( course => { return course; } )
            .subscribe(
                course => {
                    if (course) {
                        title = course.title;
                    }
                }
            );

        return title ? title : id;
    }

    public deleteCourse(courseId: number): void {
        this.http.deleteModel(this.getIdSpecificCoursesUrl(courseId))
            .map( (res: Response) => { return res.json(); })
            .subscribe(
                (res) => {
                    this.coursesActions.deleteCourse(res);
                }
            );
    }

    public fetchSingleCourse(courseId: number) {
        this.http.get(this.getIdSpecificCoursesUrl(courseId))
            .map ( (res: Response) => { return res.json(); })
            .subscribe(
                res => {
                    if (res.fail) {
                        this.router.navigate(['**']);
                    } else {
                        this._singleCourseObservable.next(res);
                    }
                }
            );
    }

    public getSingleCourseById(): Observable<ICourse> {
        return this.singleCourseObservable;
    }

    public updateCourse(courseObject: ICourse, callback: Function): void {
        this.http.put(this.getIdSpecificCoursesUrl(courseObject.id), courseObject)
            .map( (res: Response) => { return res.json(); })
            .subscribe(
                (res) => {
                    this.coursesActions.updateCurse(res);
                    callback();
                }
            );
    }

    public createCourse(courseObject: ICourse, callback: Function): void {
        this.http.post(this.createCourseURL, courseObject)
            .map( ( res: Response ) => { return res.json(); })
            .subscribe(
                (res) => {
                    this.coursesActions.createCourse(res);
                    callback();
                }
            );
    }

    public fetchCourses(searchText: string = ''): void {

        this.http.get(this.getAllCoursesUrlWithSearchText(searchText))
            .map( (res: Response) => { return res.json(); })
            .subscribe(
                (res) => {
                    this.coursesActions.courseListUpdated(res);
                }
            );

    }

    private getAllCoursesUrlWithSearchText(searchText: string = ''): string {
        return `http://localhost:3000/coursesAll?` +
            `&searchText=${searchText}`;
    }

    private getIdSpecificCoursesUrl(id: number): string {
        return `http://localhost:3000/courses/${id}`;
    }
}
