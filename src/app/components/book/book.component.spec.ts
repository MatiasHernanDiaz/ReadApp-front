import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BookComponent } from './book.component'

describe('BookComponent', () => {
  let component: BookComponent
  let fixture: ComponentFixture<BookComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookComponent]
    })
    .compileComponents()

    fixture = TestBed.createComponent(BookComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('never enter',() => {
    expect(component.isEnter).toBeFalse()
  })

  it('enter',() => {
    component.enter()
    expect(component.isEnter).toBeTrue()
  })

  it('exit',() => {
    component.enter()
    component.exit()
    expect(component.isEnter).toBeFalse()
  })

  it('normal size',() => {
    expect(component.size).toBe(180);
  })

  it('exit size', () => {
    component.enter()
    component.exit()
    expect(component.size).toBe(180);
  })

  it('enter size', () => {
    component.enter()
    expect(component.size).toBe(100);
  })
})
