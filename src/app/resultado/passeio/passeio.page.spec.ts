import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasseioPage } from './passeio.page';

describe('PasseioPage', () => {
  let component: PasseioPage;
  let fixture: ComponentFixture<PasseioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasseioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasseioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
