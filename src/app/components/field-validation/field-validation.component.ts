import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-field-validation',
  standalone: true,
  imports: [],
  templateUrl: './field-validation.component.html',
  styleUrl: './field-validation.component.css'
})
export class FieldValidationComponent {
  @Input() validationFunc: ( field: string, data: unknown ) => string = ( field: string, data: unknown ) => {
    switch( field ) {
      default:
        return data ? '' : ''
    }
  }
  @Input() data!: unknown
  @Input() field!:string


  getMessage() {
    return this.validationFunc( this.field, this.data )
  }
}


