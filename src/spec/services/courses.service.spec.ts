import {HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions, Response} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {TestBed, inject, tick, fakeAsync} from '@angular/core/testing';
import { CoursesService } from '../../app/services/courses.service';
import { AuthorizedHttpService } from '../../app/shared/services/authorized-http.service';
import { CoursesActions } from '../../app/actions/coursesActions';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";

describe('CoursesService', () => {

  let service: any;
  let httpProvider: any;
  let mockBackend: any;
  let coursesActions: any;
  let routerProvider: any;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        { provide: AuthorizedHttpService, useValue: {
          deleteModel: () => {},
          get: () => {},
          put: () => {},
          post: () => {}
        }},
        CoursesService,
        { provide: Router, useValue: {navigate: () => {}} },
        { provide: XHRBackend, useClass: MockBackend },
        { provide: CoursesActions, useValue: {
          deleteCourse: () => {},
          updateCurse: () => {},
          createCourse: () => {},
          courseListUpdated: () => {}
          }
        }
      ]
    });

    service = TestBed.get(CoursesService);
    httpProvider = TestBed.get(AuthorizedHttpService);
    coursesActions = TestBed.get(CoursesActions);
    routerProvider = TestBed.get(Router);
  });

  it('should test getTitleById without fetching any course before', fakeAsync(() => {
      const testId = 1;
      const testValue = service.getTitleById(testId);
      expect(testValue === testId).toBeTruthy();
  }));

  it('should test getTitleById with fetching any course before', fakeAsync(() => {
    const testTitle = 'Test title';
    service._singleCourseObservable.next({title: testTitle});
    tick();
    const testValue = service.getTitleById(1);
    expect(testValue === testTitle).toBeTruthy();
  }));

  it('should test deleteCourse method', () => {
    spyOn(coursesActions, 'deleteCourse');
    spyOn(httpProvider, 'deleteModel').and.returnValue(Observable.of(new Response(
      new ResponseOptions({
        body: {id: 1}
      })
    )));
    service.deleteCourse();
    expect(httpProvider.deleteModel).toHaveBeenCalled();
    expect(coursesActions.deleteCourse).toHaveBeenCalledWith({id: 1});
  });

  it('should test fetchSingleCourse method with success response', () => {
    let testId = 1;
    spyOn(httpProvider, 'get').and.returnValue(Observable.of(new Response(
      new ResponseOptions({
        body: {id: testId}
      })
    )));
    service.fetchSingleCourse(testId);
    service.getSingleCourseById().subscribe((value) => {
      expect(value.id).toBe(testId)
    });
    expect(httpProvider.get).toHaveBeenCalled();
  });

  it('should test fetchSingleCourse method with error response', () => {
    const testId = void 0;
    spyOn(routerProvider, 'navigate');
    spyOn(httpProvider, 'get').and.returnValue(Observable.of(new Response(
      new ResponseOptions({
        body: {fail: true}
      })
    )));
    service.fetchSingleCourse(testId);
    expect(httpProvider.get).toHaveBeenCalled();
    expect(routerProvider.navigate).toHaveBeenCalledWith(['**'])
  });

  it('should test getSingleCourseById (without any call before', () => {
    service.getSingleCourseById().subscribe( value => {
      expect(value).toBeNull();
    });
  });

  it('should test getSingleCourseById (with any call before', fakeAsync( () => {
    const testCourse = {title: 'testTitle', id: 1};
    service._singleCourseObservable.next(testCourse);
    tick();
    service.getSingleCourseById().subscribe( value => {
      expect(value).toBe(testCourse);
    })
  }));

  it('should test updateCourse function', () => {
    const response = {id: 1, title: 'Test title'};
    spyOn(coursesActions, 'updateCurse');
    spyOn(httpProvider, 'put').and.returnValue(Observable.of(new Response(
      new ResponseOptions({
        body: response
      })
    )));

    service.updateCourse(response);
    expect(httpProvider.put).toHaveBeenCalled();
    expect(coursesActions.updateCurse).toHaveBeenCalledWith(response);
  });

  it('should test createCourse function', () => {
    const response = {id: 1, title: 'Test title'};
    spyOn(coursesActions, 'createCourse');
    spyOn(httpProvider, 'post').and.returnValue(Observable.of(new Response(
      new ResponseOptions({
        body: response
      })
    )));

    service.createCourse(response);
    expect(httpProvider.post).toHaveBeenCalled();
    expect(coursesActions.createCourse).toHaveBeenCalledWith(response);
  });

  it('should test fetchCourses function', () => {
    const response = {id: 1, title: 'Test title'};
    spyOn(coursesActions, 'courseListUpdated');
    spyOn(httpProvider, 'get').and.returnValue(Observable.of(new Response(
      new ResponseOptions({
        body: response
      })
    )));

    service.fetchCourses();
    expect(httpProvider.get).toHaveBeenCalled();
    expect(coursesActions.courseListUpdated).toHaveBeenCalledWith(response);
  });

  it('should test getAllCoursesUrlWithSearchText', () => {
      let text = 'test string',
          expectedResult = `http://localhost:3000/coursesAll?&searchText=`,
          testedValue = service.getAllCoursesUrlWithSearchText(text);
      expect(testedValue === (expectedResult + text)).toBeTruthy();

      testedValue = service.getAllCoursesUrlWithSearchText();
      expect(testedValue === expectedResult).toBeTruthy();
  });

  it('should test getIdSpecificCoursesUrl', () => {
    let id = 1,
        expectedResult = `http://localhost:3000/courses/`,
        testValue = service.getIdSpecificCoursesUrl(id);
    expect(testValue === (expectedResult + id)).toBeTruthy();

    testValue = service.getIdSpecificCoursesUrl();
    expect(testValue === (expectedResult + void 0)).toBeTruthy();

  })

});
