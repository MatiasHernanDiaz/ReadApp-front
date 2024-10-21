import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ProfileScreen } from "./profile.component"
import { LoginService } from "@src/app/services/Login/login.service"
import { loginServiceStub } from "@src/app/services/serviceStubs"
import { provideRouter } from "@angular/router"
import { routes } from "@src/app/app.routes"


describe('ProfileScreen', () => {
  let component: ProfileScreen
  let fixture: ComponentFixture<ProfileScreen>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileScreen],
      providers: [ 
        provideRouter(routes),
        { provide: LoginService, useValue: loginServiceStub }
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(ProfileScreen)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
