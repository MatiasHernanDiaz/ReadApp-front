import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomstoevaluateComponent } from './recomstoevaluate.component';

describe('RecomstoevaluateComponent', () => {
  let component: RecomstoevaluateComponent;
  let fixture: ComponentFixture<RecomstoevaluateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomstoevaluateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecomstoevaluateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
