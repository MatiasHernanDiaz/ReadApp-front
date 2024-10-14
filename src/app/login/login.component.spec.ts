import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { LoginScreen } from './login.component'
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import { LoginService } from '../services/Login/login.service'

describe('LoginScreen', () => {
  let component: LoginScreen
  let fixture: ComponentFixture<LoginScreen>
  let mockRouter: jasmine.SpyObj<Router>
  let mockLoginService: jasmine.SpyObj<LoginService>

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl'])
    mockLoginService = jasmine.createSpyObj('LoginService', ['login'])

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CommonModule,
        LoginScreen
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: LoginService, useValue: mockLoginService }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(LoginScreen)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  describe('Form Initialization', () => {
    it('should create the form with empty fields', () => {
      expect(component.loginForm).toBeTruthy()
      expect(component.loginForm.get('user')?.value).toBe('')
      expect(component.loginForm.get('password')?.value).toBe('')
    })
  })

  describe('User Field Validation', () => {
    it('should display validation message for required user field', () => {
      component.loginForm.get('user')?.setValue('')
      fixture.detectChanges()

      component.login()
      fixture.detectChanges()

      const userError = fixture.nativeElement.querySelector('.alert-message')
      expect(userError).toBeTruthy()
      expect(userError.textContent).toContain('El mail de usuario es obligatorio.')
    })
  })

  describe('Password Field Validation', () => {
    it('should display validation message for required password field', () => {
      component.loginForm.get('password')?.setValue('')
      fixture.detectChanges()

      component.login()
      fixture.detectChanges()

      const passwordError = fixture.nativeElement.querySelectorAll('.alert-message')[1]
      expect(passwordError).toBeTruthy()
      expect(passwordError.textContent).toContain('La contraseña es obligatoria.')
    })
  })
})