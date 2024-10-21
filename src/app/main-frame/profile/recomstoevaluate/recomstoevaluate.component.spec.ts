import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideRouter } from '@angular/router'
import { routes } from '@src/app/app.routes'
import { SearchBarComponent } from '@src/app/components/search-bar/search-bar.component'

describe('SearchBarComponent', () => {
  let component: SearchBarComponent
  let fixture: ComponentFixture<SearchBarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent],
      providers: [provideRouter(routes)] 
    }).compileComponents()

    fixture = TestBed.createComponent(SearchBarComponent)
    component = fixture.componentInstance 
    fixture.detectChanges() 
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('debe emitir "dodino" cuando presiono "Enter"', () => {
    spyOn(component.lookup, 'emit') 

    component.userInput = 'dodino' // simulo el ingreso de palabra dodino
    

    component.search({ key: 'Enter' }) // evento simulado enter


    expect(component.lookup.emit).toHaveBeenCalledWith('dodino')//esta ok?
  })
})
