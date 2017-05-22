import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ICourse } from '../interfaces/course-interfaces/course-interface';
import { reduxConstants } from '../constants/reduxConstants';

@Injectable()
export class CoursesActions {

    constructor(
        private store: Store<any>
    ) {

    }
    public courseListUpdated(payload: ICourse[]): void {
        this.store.dispatch({type: reduxConstants.COURSES_UPDATED, payload: payload});
    }

    public getCourses() {
        return this.store.select('courses');
    }

    public navigateToCoursesPage(step: number): void {
        this.store.dispatch({type: reduxConstants.COURSES_NAVIGATE, payload: {currentStep: step} });
    }

    public deleteCourse(course: ICourse): void {
        this.store.dispatch({type: reduxConstants.COURSE_DELETED, payload: course});
    }

    public updateCurse(course: ICourse): void {
        this.store.dispatch({ type: reduxConstants.COURSE_UPDATED, payload: course });
    }

    public createCourse(course: ICourse): void {
        this.store.dispatch({ type: reduxConstants.COURSE_CREATED, payload: course });
    }
}
