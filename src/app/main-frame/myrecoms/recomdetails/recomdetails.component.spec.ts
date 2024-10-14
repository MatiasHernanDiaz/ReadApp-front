import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecomdetailsComponent } from './recomdetails.component'
import { routes } from '@src/app/app.routes'
import { provideRouter } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { httpClientSpy, loginServiceStub } from '@src/app/services/serviceStubs'
import { LoginService } from '@src/app/services/Login/login.service'

describe('RecomdetailsComponent', () => {
  let component: RecomdetailsComponent
  let fixture: ComponentFixture<RecomdetailsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomdetailsComponent],   
      providers: [
        provideRouter(routes),
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: LoginService, useValue: loginServiceStub }
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
