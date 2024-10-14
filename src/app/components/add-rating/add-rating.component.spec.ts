import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClient } from '@angular/common/http'
import { AddRatingComponent } from './add-rating.component'
import { provideRouter } from '@angular/router'
import { LoginService } from '@src/app/services/Login/login.service'
import { routes } from '@src/app/app.routes'
import { httpClientSpy, loginServiceStub } from '@src/app/services/serviceStubs'

describe('AddRatingComponent', () => {
  let component: AddRatingComponent
  let fixture: ComponentFixture<AddRatingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRatingComponent],
      providers: [
        provideRouter(routes), 
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: LoginService, useValue: loginServiceStub }
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(AddRatingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
