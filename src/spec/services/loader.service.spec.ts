import {HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions, Response} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {TestBed, inject, tick, fakeAsync} from '@angular/core/testing';
import { LoaderService } from '../../app/shared/services/loader.service';
import { AuthorizedHttpService } from '../../app/shared/services/authorized-http.service';
import { CoursesActions } from '../../app/actions/coursesActions';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";

describe('LoaderService', () => {

  let service: any;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
          LoaderService
      ]
    });

    service = TestBed.get(LoaderService);
  });

  it('should update notify all subscribed components about enabling loader after enableLoader call', () => {
      spyOn(service._showLoader, 'next');
      service.enableLoader();
      expect(service._showLoader.next).toHaveBeenCalledWith(true);
  });

    it('should update notify all subscribed components about disabling loader after enableLoader call', () => {
        spyOn(service._showLoader, 'next');
        service.disableLoader();
        expect(service._showLoader.next).toHaveBeenCalledWith(false);
    })

});
