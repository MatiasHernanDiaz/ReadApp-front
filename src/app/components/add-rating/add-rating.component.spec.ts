import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClient } from '@angular/common/http'
import { AddRatingComponent } from './add-rating.component'
import { provideRouter } from '@angular/router'
import { LoginService } from '@src/app/services/Login/login.service'
import { routes } from '@src/app/app.routes'
import { httpClientSpy, loginServiceStub } from '@src/app/services/serviceStubs'

describe('AddRatingComponent', () => {
  let component: AddRatingComponent
  let fixture: ComponentFixture<AddRatingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRatingComponent],
      providers: [
        provideRouter(routes), 
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: LoginService, useValue: loginServiceStub }
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(AddRatingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('Cuando se clickea la segunda estrella, la primera y la segunda estan pintadas', () => {
    component.displaySelector = true
    fixture.detectChanges()
    const star2 = fixture.debugElement.nativeElement.querySelector(`[data-testid="star_2"]`)
    star2.click()
    fixture.detectChanges()
    const star1 = fixture.debugElement.nativeElement.querySelector(`[data-testid="star_1"]`)
    const star3 = fixture.debugElement.nativeElement.querySelector(`[data-testid="star_3"]`)
    console.log(star3.attributes['name'])
    expect(star2.getAttribute('ng-reflect-name')).toBe('bootstrapStarFill')
    expect(star1.getAttribute('ng-reflect-name')).toBe('bootstrapStarFill')
    expect(star3.getAttribute('ng-reflect-name')).toBe('bootstrapStar')
  })
})