import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecomdetailsComponent } from './recomdetails.component'
import { routes } from '@src/app/app.routes'
import { provideRouter } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { httpClientSpy, loginServiceStub, recomServiceStub } from '@src/app/services/serviceStubs'
import { LoginService } from '@src/app/services/Login/login.service'
import { RecommendationService } from '@src/app/services/Recom/recommendation.service'

describe('RecomdetailsComponent', () => {
  let component: RecomdetailsComponent
  let fixture: ComponentFixture<RecomdetailsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomdetailsComponent],   
      providers: [
        provideRouter(routes),
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: LoginService, useValue: loginServiceStub },
        { provide: RecommendationService, useValue: recomServiceStub}
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(RecomdetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('El loadin en false cuando cargo la recom', () =>{
    fixture.detectChanges()
    expect(component.loading).toBe(false)
  })

  it('cuando carga la recom de id 1 espero que', () =>{
    component.recomid = 1
    component.useridLog = 1
    component.ngOnInit()
    fixture.detectChanges()
    console.log('recomendacion: ', component.recom)
    expect(component.recom.id).toBe(1)
    expect(component.recom.title).toBe('1')
  })



  
})
