import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { NgIf, CommonModule } from '@angular/common'
import { StubLoginService } from '@src/services/UserService'

@Component({
  selector: 'login-screen',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginScreen implements OnInit {
  loginError = ''
  loginForm!: FormGroup
  isSubmitted = false
  loginFailed = false

  constructor(private fb: FormBuilder, private router: Router, private loginService: StubLoginService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  login() {
    this.isSubmitted = true
    this.loginFailed = false

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      console.log('Formulario no válido')
      return
    }

    const loginData = this.loginForm.value

    if (this.loginForm.valid) {
      const result = this.loginService.login({
        email: loginData.user,
        password: loginData.password
      })

      if (result.ok) {
        console.log('Login exitoso')
        this.loginError = ''
        this.loginFailed = false

        localStorage.setItem('loggedInUser', loginData.user)
        this.router.navigateByUrl('/app/recoms')

      } else {
        this.loginError = 'Email o contraseña incorrectos.'
        this.loginFailed = true
        console.log('Login fallido: Credenciales incorrectas')
      }
    }
  }

  hasUserError(): boolean {
    const userControl = this.user
    return !!userControl && userControl.invalid && (userControl.dirty || this.isSubmitted)
  }

  hasPasswordError(): boolean {
    const passwordControl = this.password
    return !!passwordControl && passwordControl.invalid && (passwordControl.dirty || this.isSubmitted)
  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.password
    if (passwordControl && passwordControl.hasError('required')) {
      return 'La contraseña es obligatoria.'
    }
    return ''
  }

  get user() {
    return this.loginForm.get('user')
  }

  get password() {
    return this.loginForm.get('password')
  }
}