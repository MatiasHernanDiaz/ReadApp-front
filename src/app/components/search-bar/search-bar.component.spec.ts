import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SearchBarComponent } from './search-bar.component'
import { provideRouter } from '@angular/router'
import { routes } from '@src/app/app.routes'

describe('SearchBarComponent', () => {
  let component: SearchBarComponent
  let fixture: ComponentFixture<SearchBarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent],   providers: [provideRouter(routes)]
    })
    .compileComponents()

    fixture = TestBed.createComponent(SearchBarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
