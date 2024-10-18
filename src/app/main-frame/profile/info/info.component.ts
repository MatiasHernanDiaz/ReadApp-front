import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Language, readerModes, ReadMode, SearchCriteria, User } from '@src/app/model/User'
import { CommonModule } from '@angular/common'
import { FieldValidationComponent } from "../../../components/field-validation/field-validation.component"
import { UserService } from '@src/app/services/User/user.service'
import { LoginService } from '@src/app/services/Login/login.service'
import Swal from 'sweetalert2'


@Component({
  selector: 'app-info',
  standalone: true,
  imports: [FormsModule, CommonModule, FieldValidationComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  user: User = new User(-1, '', '', '', new Date(),'', Language.SPANISH,[],[],[], 0 )
  readModes = (readerModes)
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
  

  getReadModeChecked(readMode: ReadMode) {
    return Boolean(readMode.toCustomString() === this.readModeChecked)
  }


  resetSearchCriteria() {
    this.searchCriteria = {
      cautious: {
        checked: this.user.searchCriteria.includes( SearchCriteria.Cautious ),
        criteria: SearchCriteria.Cautious,
        requireNumberParam: false
      },
      claiment: {
        checked: this.user.searchCriteria.includes( SearchCriteria.Claimant ),
        criteria: SearchCriteria.Claimant,
        requireNumberParam: false
      },
      inconstant: {
        checked: this.user.searchCriteria.includes( SearchCriteria.Inconstant ),
        criteria: SearchCriteria.Inconstant,
        requireNumberParam: true
      },
      greatReader: {
        checked: this.user.searchCriteria.includes( SearchCriteria.GreatReader ),
        criteria: SearchCriteria.GreatReader,
        requireNumberParam: false
      },
      nativist: {
        checked: this.user.searchCriteria.includes( SearchCriteria.Nativist ),
        criteria: SearchCriteria.Nativist,
        requireNumberParam: false
      },
      polyglot: {
        checked: this.user.searchCriteria.includes( SearchCriteria.Polyglot ),
        criteria: SearchCriteria.Polyglot,
        requireNumberParam: false
      },
      experiencied: {
        checked: this.user.searchCriteria.includes( SearchCriteria.Experiencied ),
        criteria: SearchCriteria.Experiencied,
        requireNumberParam: false
      },
      calculator: {
        checked: this.user.searchCriteria.includes( SearchCriteria.Calculator ),
        criteria: SearchCriteria.Calculator,
        requireNumberParam: true
      }
    }
  }

  setBirthday = ( e: Event ) => { 
    this.user.birthday = new Date( (e.target as HTMLInputElement).value )
  }

  updateSearchCriteria( criteria: string) {
    this.searchCriteria[ criteria ].checked = !this.searchCriteria[ criteria ].checked

    this.user.searchCriteria = Object.values(this.searchCriteria).filter( cri => cri.checked ).map( cri => cri.criteria )
  }

  cancelUserEdit() {
    this.user = this.loginService.getSignedUser()!
    this.resetSearchCriteria()
    this.editMode = false
  }

  async saveUserInfo() {
    if( !this.hasError() ) {
      this.buttonState = "Cargando..."
  
      try {
        await this.userService.editUser( this.user )
      } catch {
        Swal.fire({
          title: "¡Problemas para editar este perfil!",
          icon: 'error'
        })
      }
      this.editMode = false
      this.buttonState = "Guardar cambios"
      this.user = User.fromUserJSON((await this.loginService.refreshSignedUser()).user)
    } else {
      Swal.fire({
        title: "¡Formulario con errores!",
        icon: 'error'
      })

      this.user = this.loginService.getSignedUser()
    }
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
        return (data as User).birthday < new Date(1900, 1, 1) ? "No existen personas tan viejas!!" : ''
      case "email":
        return (data as User).email === '' ? "El email es requerido" : !(data as User).email.includes('@') ? 'Debe contener @' : ''
      case "readTimeMinAvg":
        return (data as User).readTimeMinAvg <= 0 || (data as User).readTimeMinAvg % 1 !== 0 ? "Debe ser un entero positivo" : ''
      default:
        return ''
    }
  }

  hasError() {
    return Object.keys(this.user).some( field => this.formValidation(field, this.user) !== '' )
  }
}
