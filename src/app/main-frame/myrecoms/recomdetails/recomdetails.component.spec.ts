import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecomdetailsComponent } from './recomdetails.component'
import { routes } from '@src/app/app.routes'
import { provideRouter } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { httpClientSpy } from '@src/app/services/serviceStubs'

describe('RecomdetailsComponent', () => {
  let component: RecomdetailsComponent
  let fixture: ComponentFixture<RecomdetailsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomdetailsComponent],   
      providers: [
        provideRouter(routes),
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(RecomdetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
