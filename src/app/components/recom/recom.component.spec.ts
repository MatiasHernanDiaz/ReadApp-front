import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecomComponent } from './recom.component'
import { provideRouter } from '@angular/router'
import { routes } from '@src/app/app.routes'

describe('CardComponent', () => {
  let component: RecomComponent
  let fixture: ComponentFixture<RecomComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomComponent],
      providers: [provideRouter(routes)]
    })
    .compileComponents()

    fixture = TestBed.createComponent(RecomComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})


