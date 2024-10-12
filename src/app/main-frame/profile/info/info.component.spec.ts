import { ComponentFixture, TestBed } from '@angular/core/testing'

import { InfoComponent } from './info.component'
import { httpClientSpy } from '@src/app/services/serviceStubs'
import { HttpClient } from '@angular/common/http'

describe('InfoComponent', () => {
  let component: InfoComponent
  let fixture: ComponentFixture<InfoComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoComponent],
      providers: [ 
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(InfoComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
