import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MainFrameComponent } from './main-frame.component'
import { provideRouter } from '@angular/router'
import { routes } from '../app.routes'


describe('MainFrameComponent', () => {
  let component: MainFrameComponent
  let fixture: ComponentFixture<MainFrameComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainFrameComponent],
      providers: [provideRouter(routes)]
    })
    .compileComponents()

    fixture = TestBed.createComponent(MainFrameComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
