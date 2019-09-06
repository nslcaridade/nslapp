import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheBazarPage } from './detalhe-bazar.page';

describe('BazarPage', () => {
  let component: DetalheBazarPage;
  let fixture: ComponentFixture<DetalheBazarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheBazarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheBazarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
