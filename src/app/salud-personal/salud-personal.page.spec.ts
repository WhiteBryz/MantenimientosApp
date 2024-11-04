import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaludPersonalPage } from './salud-personal.page';

describe('SaludPersonalPage', () => {
  let component: SaludPersonalPage;
  let fixture: ComponentFixture<SaludPersonalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SaludPersonalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
