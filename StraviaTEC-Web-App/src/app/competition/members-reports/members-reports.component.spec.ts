import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersReportsComponent } from './members-reports.component';

describe('MembersReportsComponent', () => {
  let component: MembersReportsComponent;
  let fixture: ComponentFixture<MembersReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
