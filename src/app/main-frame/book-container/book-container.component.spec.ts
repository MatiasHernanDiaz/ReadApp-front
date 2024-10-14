import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BookContainerComponent } from './book-container.component'
import { routes } from '@src/app/app.routes'
import { provideRouter } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { httpClientSpy } from '@src/app/services/serviceStubs'

describe('BookContainerComponent', () => {
  let component: BookContainerComponent
  let fixture: ComponentFixture<BookContainerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookContainerComponent],  providers: [
        provideRouter(routes),
        { provide: HttpClient, useValue: httpClientSpy },
      ],
      
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
