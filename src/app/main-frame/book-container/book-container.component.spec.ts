import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BookContainerComponent } from './book-container.component'
import { routes } from '@src/app/app.routes'
import { provideRouter } from '@angular/router'

describe('BookContainerComponent', () => {
  let component: BookContainerComponent
  let fixture: ComponentFixture<BookContainerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookContainerComponent],  providers: [provideRouter(routes)]
    })
    .compileComponents()

    fixture = TestBed.createComponent(BookContainerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
