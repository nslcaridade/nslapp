import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoacaoPage } from './doacao.page';

describe('DoacaoPage', () => {
  let component: DoacaoPage;
  let fixture: ComponentFixture<DoacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoacaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
