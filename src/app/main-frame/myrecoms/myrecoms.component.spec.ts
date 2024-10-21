import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MyrecomsComponent } from './myrecoms.component'
import { routes } from '@src/app/app.routes'
import { provideRouter } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { httpClientSpy } from '@src/app/services/serviceStubs'
//import {recommensationServiceStub } from '@src/app/services/serviceStubs'

describe('MyrecomsComponent', () => {
  let component: MyrecomsComponent
  let fixture: ComponentFixture<MyrecomsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyrecomsComponent],
      providers: [provideRouter(routes), 
        { provide: HttpClient, useValue: httpClientSpy },
        //{ provide: RecommendationService, useValue: recommensationServiceStub}
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(MyrecomsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

    // it('Inicialmente esta el componente loading', () => {
    //   expect(component.loading).toBe(true)
    // })

    
    // it('Antes de cargar las recomendaciones', () => {
    //   expect(component.recommendations.length).toEqual(0)
    // })

    // it('Despues de cargadas las rescomendaciones',()=>{
    //   component.goToFind('')
    //   fixture.detectChanges()
    //   expect(component.recommendations.length).toEqual(2)
    // })
})
