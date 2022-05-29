import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRaceComponent } from './info-race.component';

describe('InfoRaceComponent', () => {
  let component: InfoRaceComponent;
  let fixture: ComponentFixture<InfoRaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoRaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
