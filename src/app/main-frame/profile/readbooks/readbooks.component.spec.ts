import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ReadbooksComponent } from './readbooks.component'
import { HttpClient } from '@angular/common/http'
import { httpClientSpy } from '@src/app/services/serviceStubs'

describe('ReadbooksComponent', () => {
  let component: ReadbooksComponent
  let fixture: ComponentFixture<ReadbooksComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadbooksComponent],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(ReadbooksComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
