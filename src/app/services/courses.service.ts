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
    private currentStep: number = 1;
    private coursesOnPage: number = 2;
    private createCourseURL: string = 'http://localhost:3000/courses';

    constructor(
        private http: AuthorizedHttpService
    ) {

    }

    public fetchCourses() {
        this.http.get(this.getCoursesUrl())
            .map( (res: Response) => { return res.json(); })
            .subscribe(
                res => {
                    this._coursesObservable.next(res);
                }
            );
    }

    public deleteCourse(courseId: number): void {
        this.http.deleteModel(this.getIdSpecificCoursesUrl(courseId))
            .map( (res: Response) => { return res.json(); })
            .subscribe(
                (res) => {
                    if (res.success) {
                        this.fetchCourses();
                    }
                }
            );
    }

    public getCoursesList(): Observable<{newCourses: ICourse[], totalCount: number}> {
        this.fetchCourses();
        return this.coursesObservable;
    }

    public createCourse(courseObject: ICourse): void {

        this.http.post(this.createCourseURL, courseObject)
            .map( ( res: Response ) => { return res.json; })
            .subscribe(
                () => {
                    this.fetchCourses();
                }
            );
    }

    public updateCourse(courseObject: ICourse): void {
        this.http.put(this.getIdSpecificCoursesUrl(courseObject.id), courseObject)
            .map( (res: Response) => { return res.json(); })
            .subscribe(
                (res) => {
                    if (res.success) {
                        this.fetchCourses();
                    }
                }
            );
    }

    public getCurrentStep(): number {
        return this.currentStep;
    }

    public getCoursesOnPage(): number {
        return this.coursesOnPage;
    }

    public updateCourseSearchText(searchText: string): void {
        this.courseSearchText = searchText;
    }

    public setCurrentStep(step: number): void {
        this.currentStep = step;
    }

    public setCoursesOnPage(coursesOnPage: number): void {
        this.coursesOnPage = coursesOnPage;
    }

    private getCoursesUrl(): string {
        return `http://localhost:3000/courses?` +
                `pageNumber=${this.currentStep}` +
                `&coursesOnPage=${this.coursesOnPage}` +
                `&searchText=${this.courseSearchText}`;
    }

    private getIdSpecificCoursesUrl(id: number): string {
        return `http://localhost:3000/courses/${id}`;
    }
}
