import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionsReportsComponent } from './positions-reports.component';

describe('PositionsReportsComponent', () => {
  let component: PositionsReportsComponent;
  let fixture: ComponentFixture<PositionsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionsReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
