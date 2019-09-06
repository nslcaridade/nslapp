import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiretrizesPage } from './diretrizes.page';

describe('DiretrizesPage', () => {
  let component: DiretrizesPage;
  let fixture: ComponentFixture<DiretrizesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiretrizesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiretrizesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
