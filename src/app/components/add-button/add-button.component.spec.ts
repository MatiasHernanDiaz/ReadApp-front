import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddButtonComponent } from './add-button.component'
import { User } from '@src/model/User'

describe('AddButtonComponent', () => {
  let component: AddButtonComponent<User>
  let fixture: ComponentFixture<AddButtonComponent<User>>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddButtonComponent]
    })
    .compileComponents()

    fixture = TestBed.createComponent(AddButtonComponent<User>)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
