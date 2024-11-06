import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstudiosMedicosPage } from './estudios-medicos.page';

describe('EstudiosMedicosPage', () => {
  let component: EstudiosMedicosPage;
  let fixture: ComponentFixture<EstudiosMedicosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiosMedicosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
