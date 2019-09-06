import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FestaPage } from './festa.page';

describe('FestaPage', () => {
  let component: FestaPage;
  let fixture: ComponentFixture<FestaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FestaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FestaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
