import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClient } from '@angular/common/http'
import { AddBookComponent } from './add-book.component'
import { provideRouter } from '@angular/router'
import { LoginService } from '@src/app/services/Login/login.service'
import { routes } from '@src/app/app.routes'
import { httpClientSpy, loginServiceStub } from '@src/app/services/serviceStubs'

describe('AddRatingComponent', () => {
  let component: AddBookComponent
  let fixture: ComponentFixture<AddBookComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBookComponent],
      providers: [
        provideRouter(routes), 
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: LoginService, useValue: loginServiceStub }
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(AddBookComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
