import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SegurosSaludPage } from './seguros-salud.page';

describe('SegurosSaludPage', () => {
  let component: SegurosSaludPage;
  let fixture: ComponentFixture<SegurosSaludPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SegurosSaludPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
