import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LoginScreen } from './login.component'

describe('BookContainerComponent', () => {
  let component: LoginScreen
  let fixture: ComponentFixture<LoginScreen>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginScreen]
    })
    .compileComponents()

    fixture = TestBed.createComponent(LoginScreen)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})