import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { bootstrapPlusCircleFill } from '@ng-icons/bootstrap-icons'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { Recommendation } from '@src/app/model/Recommendation'
import { Language, User } from '@src/app/model/User'
import { LoginService } from '@src/app/services/Login/login.service'
import { RecommendationService } from '@src/app/services/Recom/recommendation.service'

@Component({
  selector: 'app-add-recom',
  standalone: true,
  imports: [ NgIconComponent, FormsModule],
  viewProviders: [provideIcons({ bootstrapPlusCircleFill })],
  templateUrl: './add-recom.component.html',
  styleUrl: './add-recom.component.css'
})
export class AddRecomComponent {

  createRecom : {userid: number, title: string} = {userid:-1,title:''}
  recom : Recommendation = new Recommendation(0,'','',0,0,'',[],new User(0, '', '', '', new Date(),'',Language.SPANISH,[],[],[], 0 ),[],false, [])

  constructor(private recomService: RecommendationService, private loginService: LoginService, private router: Router){}

  async ngOnInit(){
    this.createRecom.userid = await this.loginService.getSignedUser().id
  }

  displaySelector: boolean = false
  title = ''
  msjHelp = '¡Debes darle un titulo!'

  async save(){
    if(this.title != ''){
      this.createRecom.title = this.title
      this.recom = await this.recomService.createRecom(this.createRecom)
      this.displaySelector = false
      this.navigateToEditRecom()
    }
  }
  
  closeDialog(){
    this.displaySelector = false
    this.title = ''
  }

  addRecom(){
    this.displaySelector = true
  }

  navigateToEditRecom(){
    this.router.navigate(['app/recoms/'+this.recom.id])
  }

  get emptyInput(){
    return this.title === ''
  }

  
}
