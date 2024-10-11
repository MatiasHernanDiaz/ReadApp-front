import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { 
  Calculator, Cautious, Claimant, Experiencied, GreatReader, Inconstant, Nativist, Polyglot, 
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
  user: User = new User(0, '', '', '', new Date(),'',[],[],[], 0 )
  readModes = readerModes
  searchCriteria: Record<
    string,{ 
      checked: boolean, 
      criteria: SearchCriteria, 
      requireNumberParam: boolean,
      displayName: string 
    }
  > = {}
  editMode = false

  constructor( public loginService: StubLoginService ) {}

  ngOnInit() {
    this.user = this.loginService.getSignedUser()!
    this.resetSearchCriteria()
  }
  

  resetSearchCriteria() {
    this.searchCriteria = {
      cautious: {
        checked: Boolean(this.user.searchCriteria.find( cri => cri instanceof Cautious )),
        criteria: new Cautious(),
        requireNumberParam: false,
        displayName: "Precavido"
      },
      claiment: {
        checked: Boolean(this.user.searchCriteria.find( cri => cri instanceof Claimant )),
        criteria: new Claimant(),
        requireNumberParam: false,
        displayName: "Demandante"
      },
      inconstant: {
        checked: Boolean(this.user.searchCriteria.find( cri => cri instanceof Inconstant )),
        criteria: new Inconstant(),
        requireNumberParam: true,
        displayName: "Cambiante"
      },
      greatReader: {
        checked: Boolean(this.user.searchCriteria.find( cri => cri instanceof GreatReader )),
        criteria: new GreatReader(),
        requireNumberParam: false,
        displayName: "Leedor"
      },
      nativist: {
        checked: Boolean(this.user.searchCriteria.find( cri => cri instanceof Nativist )),
        criteria: new Nativist(),
        requireNumberParam: false,
        displayName: "Nativista"
      },
      polyglot: {
        checked: Boolean(this.user.searchCriteria.find( cri => cri instanceof Polyglot )),
        criteria: new Polyglot(),
        requireNumberParam: false,
        displayName: "Políglota"
      },
      experiencied: {
        checked: Boolean(this.user.searchCriteria.find( cri => cri instanceof Experiencied )),
        criteria: new Experiencied(),
        requireNumberParam: false,
        displayName: "Experimentado"
      },
      calculator: {
        checked: Boolean(this.user.searchCriteria.find( cri => cri instanceof Calculator )),
        criteria: new Calculator(),
        requireNumberParam: true,
        displayName: "Calculador"
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

  saveUserInfo() {
    this.loginService.updateSignedUserData( this.user )
    this.editMode = false
    alert( JSON.stringify( this.loginService.getSignedUser() ) )
  }

  setEditMode() { this.editMode = true }
}

