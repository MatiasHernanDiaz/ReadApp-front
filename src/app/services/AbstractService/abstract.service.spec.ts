import { TestBed } from '@angular/core/testing'

import { AbstractService } from '@src/app/services/AbstractService/abstract.service'

describe('AbstractService', () => {
  let service: AbstractService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(AbstractService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
