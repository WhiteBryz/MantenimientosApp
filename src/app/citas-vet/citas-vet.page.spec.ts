import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitasVetPage } from './citas-vet.page';

describe('CitasVetPage', () => {
  let component: CitasVetPage;
  let fixture: ComponentFixture<CitasVetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasVetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
