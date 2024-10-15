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

describe('RecomComponent', () => {
  let component: RecomComponent
  let fixture: ComponentFixture<RecomComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomComponent, CommonModule, NgIconComponent, HttpClientTestingModule],
      providers: [
        provideRouter(routes),
        LoginService,
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
})
