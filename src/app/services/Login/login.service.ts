import { Injectable } from '@angular/core'
import { User } from '@src/app/model/User'
import { HttpClient } from '@angular/common/http'
import { pathLogin } from '@src/app/model/Path'
import { lastValueFrom } from 'rxjs'


@Injectable({ providedIn: 'root' })
export class LoginService {
  
  private signedUser?: User | null

  constructor(protected httpClient: HttpClient){}


  getSignedUser() { return this.signedUser }

  async refreshSignedUser() {
    const url = pathLogin.login()

    const res$ = this.httpClient.get<loginRes>(url)
    const res = await lastValueFrom(res$)
    
    this.signedUser = res.user

    return res
  }

  async login(credentials: { email: string, password: string }) {
    const url = pathLogin.login()

    const res$ = this.httpClient.post<loginRes>(url, credentials)
    const res = await lastValueFrom(res$)
    
    this.signedUser = res.user

    return res
  }

  async logout() {
    const url = pathLogin.logout()

    const res$ = this.httpClient.get<void>(url)
    const res = await lastValueFrom(res$)
    
    this.signedUser = null

    return res 
  }
}

type loginRes = { login: boolean, user: User }
