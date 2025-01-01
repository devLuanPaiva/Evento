import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StepsComponent } from './steps.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('StepsComponent', () => {
  let component: StepsComponent;
  let fixture: ComponentFixture<StepsComponent>;
  let actionSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepsComponent);
    component = fixture.componentInstance;
    actionSpy = spyOn(component.action, 'emit');
  });

  it('should render the correct number of steps', () => {
    component.labels = ['Step 1', 'Step 2', 'Step 3'];
    fixture.detectChanges();
    const stepElements = fixture.debugElement.queryAll(
      By.css('.flex.items-center.gap-2'),
    );
    expect(stepElements.length).toBe(3);
  });
  it('should display correct step labels', () => {
    component.labels = ['Step 1', 'Step 2', 'Step 3'];
    fixture.detectChanges();

    const stepLabelElements = fixture.debugElement.queryAll(
      By.css('span.text-zinc-600'),
    );
    expect(stepLabelElements[0].nativeElement.textContent.trim()).toBe(
      'Step 2',
    );
    expect(stepLabelElements[1].nativeElement.textContent.trim()).toBe(
      'Step 3',
    );
  });
  it('should disable the previous button on the first step', () => {
    component.currentStep = 0;
    fixture.detectChanges();
    const previousButton = fixture.debugElement.query(
      By.css('button.bg-zinc-400'),
    );
    expect(previousButton.nativeElement.disabled).toBe(true);
  });
});
