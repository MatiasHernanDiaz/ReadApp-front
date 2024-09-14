import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GralrecomsComponent } from './gralrecoms.component'

describe('GralrecomsComponent', () => {
  let component: GralrecomsComponent
  let fixture: ComponentFixture<GralrecomsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GralrecomsComponent]
    })
    .compileComponents()

    fixture = TestBed.createComponent(GralrecomsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
