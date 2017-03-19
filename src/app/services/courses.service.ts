import { Injectable } from '@angular/core';
import { ICourse, ICourseInfoForEdit, ICourseCreate } from '../interfaces/course-interfaces/course-interface';
import { IStoreCallback } from '../interfaces/common/stores-interfaces';
@Injectable()
export class CoursesService {
    private coursesChangeCallbacksArray: Array<IStoreCallback> = [];
    private currentMaxId: number = 1;
    private courses: Array<ICourse> = [
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
        }
    ];

    public subscribeToChanges(cb: Function, context?: Object): void {
        this.coursesChangeCallbacksArray.push({
            cb: cb,
            context: context
        });
    }

    private callCbOnChanges(): void {
        for (let cbObject of this.coursesChangeCallbacksArray) {
            if (cbObject.context) {
                cbObject.cb.call(cbObject.context);
            } else {
                cbObject.cb();
            }
        }
    }

    private incrementMaxId(): void {
        this.currentMaxId++;
    }

    private addCourse(course: ICourse): void {
        this.courses.unshift(course);
        this.callCbOnChanges();
    }


    public getCoursesList(): Array<ICourse> {
        return this.courses;
    }

    public createCourse(courseObject: ICourseCreate): void {
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

    public updateCourse(courseObject: ICourseInfoForEdit): void {
        for (let course of this.getCoursesList()) {
            if (course.id === courseObject.id) {
                course.title = courseObject.title;
                course.description = courseObject.description;
                course.duration = courseObject.duration;
                break;
            }
        }
        this.callCbOnChanges();
    }

    public deleteCourse(id: number): void {
        let index;

        for ( let i in this.courses ) {
            if (this.courses[i].id === id) {
                index = i;
                break;
            }
        }

        this.courses.splice(index, 1);
        this.callCbOnChanges();
    }
}
