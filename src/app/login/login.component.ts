import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { NgIf, CommonModule } from '@angular/common'
import { LoginService } from '../services/Login/login.service'
import { SpinnerComponent } from '../components/spinner/spinner.component'


@Component({
  selector: 'login-screen',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginScreen implements OnInit {
  loginError = ''
  loginForm!: FormGroup
  isSubmitted = false
  loginFailed = false
  show = false
  isLoading = false

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  async login() {
    this.isSubmitted = true
    this.loginFailed = false
    this.isLoading = true
  
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      this.isLoading = false
      return
    }
  
    const loginData = this.loginForm.value
  
    if (this.loginForm.valid) {
      try {
        const result = await this.loginService.login({
          email: loginData.user,
          password: loginData.password
        })
        console.log(result)
  
        if (result && result.login) {
          this.loginError = ''
          this.loginFailed = false
          this.router.navigateByUrl('/app/recoms')
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.message === 'Error de conexion') {
            this.loginError = 'Error de Conexion'
          } else {
            this.loginError = 'Credenciales inválidas'
          }
          this.loginFailed = true
        }
      } finally {
        this.isLoading = false
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

  setShow(){
    this.show = !this.show 
  }
}