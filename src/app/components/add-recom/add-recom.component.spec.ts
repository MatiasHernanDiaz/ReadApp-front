import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddRecomComponent } from './add-recom.component'
import { HttpClient } from '@angular/common/http'
import { provideRouter } from '@angular/router'
import { LoginService } from '@src/app/services/Login/login.service'
import { routes } from '@src/app/app.routes'
import { httpClientSpy, loginServiceStub } from '@src/app/services/serviceStubs'

describe('AddRecomComponent', () => {
  let component: AddRecomComponent
  let fixture: ComponentFixture<AddRecomComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRecomComponent],
      providers: [
        provideRouter(routes), 
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: LoginService, useValue: loginServiceStub }
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(AddRecomComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
