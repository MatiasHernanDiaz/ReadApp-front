import { TestBed } from '@angular/core/testing'

import { LoginService } from './login.service'
import { HttpClient } from '@angular/common/http'
import { httpClientSpy } from '../serviceStubs'

describe('LoginService', () => {
  let service: LoginService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    })
    service = TestBed.inject(LoginService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
