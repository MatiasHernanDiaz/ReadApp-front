import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { ReactiveFormsModule } from '@angular/forms'
import { NgIf } from '@angular/common'


@Component({
  selector: 'login-screen',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginScreen implements OnInit {
  loginError=""
  loginForm!: FormGroup
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  login() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value
  
      // Simulación de credenciales correctas
      if (loginData.user === 'mandarina@unsam.com' && loginData.password === 'mandarina') {
        console.log('Login exitoso')
        this.loginError = ''
        
        // Guardar el estado de sesión en localStorage
        localStorage.setItem('loggedInUser', loginData.user)
  
        // Redirigir al dashboard u otra página
        this.router.navigateByUrl('/app') // Puedes cambiar la ruta
      } else {
        this.loginError = 'Usuario o contraseña incorrectos.'
        console.log('Login fallido: Credenciales incorrectas')
      }
    } else {
      this.loginForm.markAllAsTouched()
      console.log('Formulario no válido')
    }   
}
get user() {
  return this.loginForm.get('user')
}

get password() {
  return this.loginForm.get('password') 
}
}