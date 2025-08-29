import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTabsComponent } from './process-tabs.component';

describe('ProcessTabsComponent', () => {
  let component: ProcessTabsComponent;
  let fixture: ComponentFixture<ProcessTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
