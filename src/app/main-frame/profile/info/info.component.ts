import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { 
  Calculator, Cautious, Claimant, Experiencied, GreatReader, Inconstant, Language, Nativist, Polyglot, 
  readerModes, SearchCriteria, User 
} from '@src/app/model/User'
import { CommonModule } from '@angular/common'
import { StubLoginService } from '@src/app/services/UserService'


@Component({
  selector: 'app-info',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  user: User = new User(0, '', '', '', new Date(),'', Language.SPANISH,[],[],[], 0 )
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

  constructor( public loginService: StubLoginService ) {}

  ngOnInit() {
    this.user = this.loginService.getSignedUser()!
    console.log(this.user)
    this.readModeChecked = this.user.readMode.toCustomString()
    this.resetSearchCriteria()
  }
  

  resetSearchCriteria() {
    this.searchCriteria = {
      cautious: {
        checked: Boolean(this.user.searchCriteria.find( cri => cri.toCustomString() === 'Precavido' )),
        criteria: new Cautious(),
        requireNumberParam: false
      },
      claiment: {
        checked: Boolean(this.user.searchCriteria.find( cri => cri.toCustomString() === 'Demandante' )),
        criteria: new Claimant(),
        requireNumberParam: false
      },
      inconstant: {
        checked: Boolean(this.user.searchCriteria.find( cri => cri.toCustomString() === 'Cambiante' )),
        criteria: new Inconstant(),
        requireNumberParam: true
      },
      greatReader: {
        checked: Boolean(this.user.searchCriteria.find( cri => cri.toCustomString() === 'Leedor' )),
        criteria: new GreatReader(),
        requireNumberParam: false
      },
      nativist: {
        checked: Boolean(this.user.searchCriteria.find( cri => cri.toCustomString() === 'Nativista' )),
        criteria: new Nativist(),
        requireNumberParam: false
      },
      polyglot: {
        checked: Boolean(this.user.searchCriteria.find( cri => cri.toCustomString() === 'Políglota' )),
        criteria: new Polyglot(),
        requireNumberParam: false
      },
      experiencied: {
        checked: Boolean(this.user.searchCriteria.find( cri => cri.toCustomString() === 'Experimentado' )),
        criteria: new Experiencied(),
        requireNumberParam: false
      },
      calculator: {
        checked: Boolean(this.user.searchCriteria.find( cri => cri.toCustomString() === 'Calculador' )),
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
    this.user.searchCriteria = Object.values( this.searchCriteria ).filter(
      cri => cri.checked
    ).map( cri => cri.criteria )
  }

  cancelUserEdit() {
    this.user = this.loginService.getSignedUser()!
    this.resetSearchCriteria()
    this.editMode = false
  }

  async saveUserInfo() {
    this.buttonState = "Cargando..."
    await this.loginService.editUser( this.user )
    this.editMode = false
    this.buttonState = "Guardar cambios"
  }

  setEditMode() { this.editMode = true }
}

