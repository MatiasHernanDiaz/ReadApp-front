import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecomdetailsComponent } from './recomdetails.component'
import { routes } from '@src/app/app.routes'
import { provideRouter } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { activatedRouteMock, httpClientSpy, loginServiceStub, recomServiceStub } from '@src/app/services/serviceStubs'
import { LoginService } from '@src/app/services/Login/login.service'
import { RecommendationService } from '@src/app/services/Recom/recommendation.service'
import { ActivatedRoute } from '@angular/router'

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
        { provide: RecommendationService, useValue: recomServiceStub},
        { provide: ActivatedRoute, useValue: activatedRouteMock}
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

  it('cuando no se apreta el boton de editar, no aparece el de cancelar', () =>{
    const btnCancel = fixture.debugElement.nativeElement.querySelector(`[data-testid='btn-cancel']`)
    fixture.detectChanges()
    expect(btnCancel).toBe(null)
  })

  it('cuando se apreta el boton de editar, aparece el de cancelar', () =>{
    fixture.detectChanges()
    const btnEdit = fixture.debugElement.nativeElement.querySelector(`[data-testid='btn-edit']`)
    btnEdit.click()
    fixture.detectChanges()
    const btnCancel = fixture.debugElement.nativeElement.querySelector(`[data-testid='btn-cancel']`)
    expect(btnCancel).toBeTruthy()
  })
  
  it('cuando edito, aparece el input con el titulo del libro como valor', () =>{
    fixture.detectChanges()
    const btnEdit = fixture.debugElement.nativeElement.querySelector(`[data-testid='btn-edit']`)
    btnEdit.click()
    fixture.detectChanges()
    const inputTitle = fixture.debugElement.nativeElement.querySelector(`[data-testid='input-title']`)
    expect(inputTitle.value).toBe("Una aventura que recordarás")
  })
})
