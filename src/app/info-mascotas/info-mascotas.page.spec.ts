import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoMascotasPage } from './info-mascotas.page';

describe('InfoMascotasPage', () => {
  let component: InfoMascotasPage;
  let fixture: ComponentFixture<InfoMascotasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoMascotasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
