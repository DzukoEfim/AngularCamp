import { Action } from '@ngrx/store';
import { reduxConstants } from '../constants/reduxConstants';

export function coursesReducers(state, action: Action) {
    switch (action.type) {
        case reduxConstants.COURSES_UPDATED:
            return Object.assign({}, state, {coursesList: action.payload});

        case reduxConstants.COURSES_NAVIGATE:
            return Object.assign({}, state, action.payload);

        case reduxConstants.COURSE_DELETED:
            const newCourses = state.coursesList.filter( course => {
                return course.id !== action.payload.id;
            });
            return Object.assign({}, state, {coursesList: newCourses});

        case reduxConstants.COURSE_UPDATED:
            const courseIndex = state.coursesList.findIndex( course =>  {
                return course.id === action.payload.id;
            });

            if ( courseIndex > -1 ) {
                state.coursesList[courseIndex] = action.payload;
            }
            return Object.assign({}, state);

        case reduxConstants.COURSE_CREATED:
            let newCoursesList = state.coursesList;
            newCoursesList.push(action.payload);
            return Object.assign({}, state, {coursesList: newCoursesList});

        default:
            return state;
    }
}
