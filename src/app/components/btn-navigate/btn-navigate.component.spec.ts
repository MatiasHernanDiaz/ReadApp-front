import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnNavigateComponent } from './btn-navigate.component';

describe('BtnNavigateComponent', () => {
  let component: BtnNavigateComponent;
  let fixture: ComponentFixture<BtnNavigateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnNavigateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnNavigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
