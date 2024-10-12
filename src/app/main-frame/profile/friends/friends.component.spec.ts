import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FriendsComponent } from './friends.component'
import { HttpClient } from '@angular/common/http'
import { httpClientSpy } from '@src/app/services/serviceStubs'

describe('FriendsComponent', () => {
  let component: FriendsComponent
  let fixture: ComponentFixture<FriendsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendsComponent],
      providers: [ 
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(FriendsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
