import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BookstoreadComponent } from './bookstoread.component'

describe('BookstoreadComponent', () => {
  let component: BookstoreadComponent
  let fixture: ComponentFixture<BookstoreadComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookstoreadComponent]
    })
    .compileComponents()

    fixture = TestBed.createComponent(BookstoreadComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
