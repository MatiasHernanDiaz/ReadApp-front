import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MainFrameComponent } from './main-frame.component'
import { provideRouter } from '@angular/router'
import { routes } from '../app.routes'
import { HttpClient } from '@angular/common/http'
import { httpClientSpy } from '../services/serviceStubs'


describe('MainFrameComponent', () => {
  let component: MainFrameComponent
  let fixture: ComponentFixture<MainFrameComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainFrameComponent],
      providers: [
        provideRouter(routes), 
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(MainFrameComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
