import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvitationComponent } from './invitation.component';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { EventService } from '../../services/event.service';
import { WindowComponent } from '../../components/shared/window/window.component';
import { EventInformationComponent } from '../../components/event/event-information/event-information.component';
import { FormGuestComponent } from '../../components/event/form-guest/form-guest.component';
import { LoadingComponent } from '../../components/shared/loading/loading.component';
import { CommonModule } from '@angular/common';
import { Event, Guest } from 'core';

describe('InvitationComponent', () => {
  let component: InvitationComponent;
  let fixture: ComponentFixture<InvitationComponent>;
  let mockEventService: jasmine.SpyObj<EventService>;
  let mockRoute: any;

  const mockEvent: Event = {
    name: 'Sample Event',
    image: 'event-image.jpg',
    backgroundImage: 'background-image.jpg',
    guests: [
      {
        id: '12345',
        name: 'Guest 1',
        confirmed: false,
        email: '',
        hasCompanions: false,
        numberOfCompanions: 0,
      },
    ],
    id: '4423423',
    alias: 'test',
    password: 'teste123',
    description: '',
    date: undefined,
    location: '',
    expectedAudience: 0,
  };

  beforeEach(async () => {
    mockEventService = jasmine.createSpyObj('EventService', [
      'loadEvent',
      'toggleGuest',
      'addGuest',
    ]);
    mockRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('sample-alias'),
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [
        InvitationComponent,
        WindowComponent,
        EventInformationComponent,
        FormGuestComponent,
        LoadingComponent,
        CommonModule,
      ],
      providers: [
        { provide: EventService, useValue: mockEventService },
        { provide: ActivatedRoute, useValue: mockRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should load the event on init', async () => {
    mockEventService.loadEvent.and.returnValue(Promise.resolve(mockEvent));

    await component.ngOnInit();

    expect(component.event).toEqual(mockEvent);
    expect(component.guest).toEqual(mockEvent.guests[0]);
    expect(mockRoute.snapshot.paramMap.get).toHaveBeenCalledWith('alias');
    expect(mockEventService.loadEvent).toHaveBeenCalledWith('sample-alias');
  });
});
