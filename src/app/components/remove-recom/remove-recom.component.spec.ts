import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RemoveRecomComponent } from './remove-recom.component'

describe('RemoveRecomComponent', () => {
  let component: RemoveRecomComponent
  let fixture: ComponentFixture<RemoveRecomComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveRecomComponent]
    })
    .compileComponents()

    fixture = TestBed.createComponent(RemoveRecomComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
