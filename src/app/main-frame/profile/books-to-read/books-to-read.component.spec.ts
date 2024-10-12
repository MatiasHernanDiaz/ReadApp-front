import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BooksToReadComponent } from './books-to-read.component'
import { HttpClient } from '@angular/common/http'
import { httpClientSpy } from '@src/app/services/serviceStubs'

describe('BooksToReadComponent', () => {
  let component: BooksToReadComponent
  let fixture: ComponentFixture<BooksToReadComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksToReadComponent],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(BooksToReadComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
