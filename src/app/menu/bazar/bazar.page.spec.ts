import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BazarPage } from './bazar.page';

describe('BazarPage', () => {
  let component: BazarPage;
  let fixture: ComponentFixture<BazarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BazarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BazarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
