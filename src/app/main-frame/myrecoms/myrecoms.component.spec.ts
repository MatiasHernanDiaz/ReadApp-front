import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MyrecomsComponent } from './myrecoms.component'

describe('MyrecomsComponent', () => {
  let component: MyrecomsComponent
  let fixture: ComponentFixture<MyrecomsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyrecomsComponent]
    })
    .compileComponents()

    fixture = TestBed.createComponent(MyrecomsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
