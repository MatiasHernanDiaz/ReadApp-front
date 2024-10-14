import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { 
  Calculator, Cautious, Claimant, Combined, Experiencied, GreatReader, Inconstant, Language, Nativist, Polyglot, 
  readerModes, SearchCriteria, User 
} from '@src/app/model/User'
import { CommonModule } from '@angular/common'
import { FieldValidationComponent } from "../../../components/field-validation/field-validation.component"
import { UserService } from '@src/app/services/User/user.service'
import { LoginService } from '@src/app/services/Login/login.service'


@Component({
  selector: 'app-info',
  standalone: true,
  imports: [FormsModule, CommonModule, FieldValidationComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  user: User = new User(-1, '', '', '', new Date(),'', Language.SPANISH,[],[],[], 0 )
  readModes = readerModes
  readModeChecked = this.user.readMode.toCustomString()
  searchCriteria: Record<
    string,{ 
      checked: boolean, 
      criteria: SearchCriteria, 
      requireNumberParam: boolean
    }
  > = {}
  editMode = false
  buttonState = "Guardar cambios"

  constructor( public loginService: LoginService, private userService: UserService ) {}

  ngOnInit() {
    this.user = this.loginService.getSignedUser()!
   
    this.readModeChecked = this.user.readMode.toCustomString()
    this.resetSearchCriteria()
  }
  

  resetSearchCriteria() {
    this.searchCriteria = {
      cautious: {
        checked: Boolean(this.user.searchCriteria.toCustomString() === 'Precavido' ),
        criteria: new Cautious(),
        requireNumberParam: false
      },
      claiment: {
        checked: Boolean(this.user.searchCriteria.toCustomString() === 'Demandante' ),
        criteria: new Claimant(),
        requireNumberParam: false
      },
      inconstant: {
        checked: Boolean(this.user.searchCriteria.toCustomString() === 'Cambiante' ),
        criteria: new Inconstant(),
        requireNumberParam: true
      },
      greatReader: {
        checked: Boolean(this.user.searchCriteria.toCustomString() === 'Leedor' ),
        criteria: new GreatReader(),
        requireNumberParam: false
      },
      nativist: {
        checked: Boolean(this.user.searchCriteria.toCustomString() === 'Nativista' ),
        criteria: new Nativist(),
        requireNumberParam: false
      },
      polyglot: {
        checked: Boolean(this.user.searchCriteria.toCustomString() === 'Políglota' ),
        criteria: new Polyglot(),
        requireNumberParam: false
      },
      experiencied: {
        checked: Boolean(this.user.searchCriteria.toCustomString() === 'Experimentado' ),
        criteria: new Experiencied(),
        requireNumberParam: false
      },
      calculator: {
        checked: Boolean(this.user.searchCriteria.toCustomString() === 'Calculador' ),
        criteria: new Calculator(),
        requireNumberParam: true
      }
    }
  }

  setBirthday = ( e: Event ) => { 
    this.user.birthday = new Date( (e.target as HTMLInputElement).value )
  }

  updateSearchCriteria( criteria: string) {
    this.searchCriteria[ criteria ].checked = !this.searchCriteria[ criteria ].checked

    const criterias = Object.values( this.searchCriteria ).filter(
      cri => cri.checked
    ).map( cri => cri.criteria )
    this.user.searchCriteria = criterias.length > 1 ? new Combined( criterias ) : criterias[0]
  }

  cancelUserEdit() {
    this.user = this.loginService.getSignedUser()!
    this.resetSearchCriteria()
    this.editMode = false
  }

  async saveUserInfo() {
    this.buttonState = "Cargando..."
    await this.userService.editUser( this.user )
    this.editMode = false
    this.buttonState = "Guardar cambios"
  }

  setEditMode() { this.editMode = true }

  formValidation( field: string, data: unknown ) {
    
    switch( field ) {
      case "lastName":
        return (data as User).lastName === '' ? "El apellido es requerido" : ''
      case "firstName":
        return (data as User).firstName === '' ? "El nombre es requerido" : ''
      case "username":
        return (data as User).username === '' ? "El username es requerido" : ''
      case "birthday":
        return (data as User).birthday < new Date(1900, 1, 1) ? "No existen personas tan viejas!!" : (data as User).birthday < new Date() ? '' : "Debe ingresar una fecha válida"
      case "email":
        return (data as User).email === '' ? "El email es requerido" : !(data as User).email.includes('@') ? 'Debe contener @' : ''
      case "readTimeMinAvg":
        return (data as User).readTimeMinAvg <= 0 || (data as User).readTimeMinAvg % 1 !== 0 ? "Debe ser un entero positivo" : ''
      default:
        return ''
    }
  }
}

