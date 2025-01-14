import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HeaderComponent } from './header.component'
import { provideRouter } from '@angular/router'
import { routes } from '@src/app/app.routes'
import { HttpClient } from '@angular/common/http'
import { httpClientSpy, loginServiceStub } from '@src/app/services/serviceStubs'
import { LoginService } from '@src/app/services/Login/login.service'


describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter(routes), 
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: LoginService, useValue: loginServiceStub }
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('Inicialmente el menu esta plegado', () =>{
    const menu = fixture.debugElement.nativeElement.querySelector(`[data-test="menuNav"]`)
    expect(menu.getAttribute('class')).toEqual('hide')
  })

   it('Se clickea el menu y se despliega', () =>{
    const menu = fixture.debugElement.nativeElement.querySelector(`[data-test="menu"]`)
    menu.click()
    fixture.detectChanges()
    expect(component.dropdown).toEqual('dropdown-menu')
   })
})
