import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BookAddMsgComponent } from './book-add-msg.component'

describe('BookAddMsgComponent', () => {
  let component: BookAddMsgComponent
  let fixture: ComponentFixture<BookAddMsgComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookAddMsgComponent]
    })
    .compileComponents()

    fixture = TestBed.createComponent(BookAddMsgComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
