import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MsjComponent } from './msj.component'

describe('MsjComponent', () => {
  let component: MsjComponent
  let fixture: ComponentFixture<MsjComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsjComponent]
    })
    .compileComponents()

    fixture = TestBed.createComponent(MsjComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
