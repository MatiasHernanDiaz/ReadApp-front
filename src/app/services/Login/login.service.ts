import { Injectable } from '@angular/core'
import { Language, User, UserToJSON } from '@src/app/model/User'
import { HttpClient } from '@angular/common/http'
import { pathLogin } from '@src/app/model/Path'
import { lastValueFrom, Subject } from 'rxjs'


@Injectable({ providedIn: 'root' })
export class LoginService {
  
  private signedUser?: User | null
  
  changeSignedUserSubject: Subject<User> = new Subject<User>()

  constructor(protected httpClient: HttpClient){}


  getSignedUser(): User { 
    if( this.signedUser ) {
      return new User(
        this.signedUser.id,
        this.signedUser.lastName,
        this.signedUser.firstName,
        this.signedUser.username,
        this.signedUser.birthday,
        this.signedUser.email,
        this.signedUser.nativeLanguage,
        this.signedUser.friends,
        this.signedUser.readBooks,
        this.signedUser.readToBooks,
        this.signedUser.readTimeMinAvg,
        this.signedUser.readMode,
        this.signedUser.searchCriteria,
        this.signedUser.avatar,
      )
    } else {
      return new User(-1, '', '', '', new Date(),'', Language.SPANISH,[],[],[], 0 )
    }
  }

  async refreshSignedUser() {
    const url = pathLogin.login()

    const res$ = this.httpClient.get<loginRes>(url)
    const res = await lastValueFrom(res$)
    
    this.signedUser = User.fromUserJSON(res.user)
    this.changeSignedUserSubject.next( this.signedUser )

    return res
  }

  async login(credentials: { email: string, password: string }) {
    const url = pathLogin.login()

    const res$ = this.httpClient.post<loginRes>(url, credentials)
    const res = await lastValueFrom(res$)
    
    this.signedUser = User.fromUserJSON(res.user)

    return res
  }

  async logout() {
    const url = pathLogin.logout()

    const res$ = this.httpClient.get<loginRes>(url)
    const res = await lastValueFrom(res$)
    
    this.signedUser = null

    return res 
  }
}

type loginRes = { login: boolean, user: UserToJSON }
