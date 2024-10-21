import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'

import { InfoComponent } from './info.component'
import { httpClientSpy, loginServiceStub } from '@src/app/services/serviceStubs'
import { HttpClient } from '@angular/common/http'
import { LoginService } from '@src/app/services/Login/login.service'

describe('InfoComponent', () => {
  let component: InfoComponent
  let fixture: ComponentFixture<InfoComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoComponent],
      providers: [ 
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: LoginService, useValue: loginServiceStub }
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(InfoComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('Si la edición está dehabilitada, el input debería estar deshabilitado', () => {
    const lastNameInput = fixture.debugElement.nativeElement.querySelector(`[data-testid="lastname-input"]`)

    expect(lastNameInput.value).toEqual('Simpson')
    expect(lastNameInput.disabled).toBeTruthy()
  })

  it('Si habilito la edición, el input debería estar habilitado', fakeAsync(() => {
    const editPencil = fixture.debugElement.nativeElement.querySelector(`[data-testid="edit-pencil"]`)
    const lastNameInput = fixture.debugElement.nativeElement.querySelector(`[data-testid="lastname-input"]`)

    editPencil.click()
    
    fixture.detectChanges()
    tick()
    fixture.detectChanges()
    
    expect(lastNameInput.disabled).toBeFalsy()
  }))

  it('Si borro el valor del input, debería advertirme que es requerido', fakeAsync(() => {
    const editPencil = fixture.debugElement.nativeElement.querySelector(`[data-testid="edit-pencil"]`)
    const lastNameInput = fixture.debugElement.nativeElement.querySelector(`[data-testid="lastname-input"]`)

    editPencil.click()
    lastNameInput.value = ''
    lastNameInput.dispatchEvent(new Event('input'))
    fixture.detectChanges()
    tick()
    fixture.detectChanges()
    
    const validation = fixture.debugElement.nativeElement.querySelector(`[data-testid="errorMessage-lastName"]`)
    
    expect(validation.textContent).toBe( " El apellido es requerido " )
  }))
})
