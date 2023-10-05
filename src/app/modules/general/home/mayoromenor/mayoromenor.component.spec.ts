import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayoromenorComponent } from './mayoromenor.component';

describe('mayoromenorComponent', () => {
  let component: MayoromenorComponent;
  let fixture: ComponentFixture<MayoromenorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MayoromenorComponent]
    });
    fixture = TestBed.createComponent(MayoromenorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
