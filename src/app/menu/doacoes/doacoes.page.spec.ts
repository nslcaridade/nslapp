import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoacoesPage } from './doacoes.page';

describe('DoacoesPage', () => {
  let component: DoacoesPage;
  let fixture: ComponentFixture<DoacoesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoacoesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoacoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
