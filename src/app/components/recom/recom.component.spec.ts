import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecomComponent } from './recom.component'
import { provideRouter } from '@angular/router'
import { routes } from '@src/app/app.routes'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'
import { LoginService } from '@src/app/services/Login/login.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { bootstrapBookmark, bootstrapStar, bootstrapBook, 
  bootstrapClock, bootstrapHeart, bootstrapArrowRight, bootstrapTrash } from '@ng-icons/bootstrap-icons'
import { heroUsers } from '@ng-icons/heroicons/outline'
import { CommonModule } from '@angular/common'
import { loginServiceStub } from '@src/app/services/serviceStubs'
import { Language, User } from '@src/app/model/User'

describe('RecomComponent', () => {
  let component: RecomComponent
  let fixture: ComponentFixture<RecomComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomComponent, CommonModule, NgIconComponent, HttpClientTestingModule],
      providers: [
        provideRouter(routes),
          { provide: LoginService, useValue: loginServiceStub },
        provideIcons({ heroUsers, bootstrapBookmark, bootstrapStar, bootstrapBook, bootstrapClock, bootstrapHeart, bootstrapArrowRight, bootstrapTrash }),
        {
          provide: ActivatedRoute,
          useValue: {
            url: of([{ path: 'test' }]) // Simulando el valor de la URL
          }
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(RecomComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('Si es creador de la recomendacion tiene el boton del tachito', () => {
    component.recommendation.creator.id = 1
    component.user = new User(1, '', '', '', new Date(),'', Language.SPANISH,[],[],[], 0 )
    fixture.detectChanges()
    const btnRecove = fixture.debugElement.nativeElement.querySelector(`[data-testid="remove"]`)
    expect(btnRecove.getAttribute('ng-reflect-name')).toBe("bootstrapTrash")
  })
})
