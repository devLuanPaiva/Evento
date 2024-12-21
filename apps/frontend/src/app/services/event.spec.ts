import { TestBed } from '@angular/core/testing';
import { EventService } from './event.service';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { createNullEvent, createNullGuest, Event, Guest } from 'core';

describe('EventService', () => {
  let service: EventService;
  let apiServiceMock: jasmine.SpyObj<ApiService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['httpPost', 'httpGet']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        EventService,
        { provide: ApiService, useValue: apiSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
    service = TestBed.inject(EventService);
    apiServiceMock = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should toggle event', () => {
    const mockEvent = { id: '1', name: 'Test Event' } as Partial<Event>;
    service.toggleEvent(mockEvent);

    service.event$.subscribe((event) => {
      expect(event).toEqual(mockEvent);
    });
  });
});