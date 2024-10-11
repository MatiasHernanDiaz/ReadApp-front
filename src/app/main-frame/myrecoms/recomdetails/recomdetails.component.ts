import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Recommendation } from '@src/app/model/Recommendation'
import { User } from '@src/app/model/User'
import { RecommendationService } from '@src/app/services/Recom/recommendation.service'
import { RatingComponent } from '@src/app/components/rating/rating.component'
import { StubLoginService } from '@src/app/services/UserService'
import { CommonModule } from '@angular/common'
import { BookComponent } from '@src/app/components/book/book.component'
import { BtnNavigateComponent } from "../../../components/btn-navigate/btn-navigate.component"
import { AddButtonComponent } from '@src/app/components/add-button/add-button.component'
import { BookService } from '@src/app/services/Book/book.service'


@Component({
  selector: 'app-recomdetails',
  standalone: true,
  imports: [RatingComponent, CommonModule, BookComponent, BtnNavigateComponent, AddButtonComponent],
  templateUrl: './recomdetails.component.html',
  styleUrl: './recomdetails.component.css'
})
export class RecomdetailsComponent {

  volver = {action:'Volver', url:['app/myrecoms']}
  editMode = false
  recom: Recommendation = new Recommendation(0,'','',0,0,'',[],new User(0, '', '', '', new Date(),'',[],[],[], 0 ),[],false, [])
  recomEdit: Recommendation = new Recommendation(0,'','',0,0,'',[],new User(0, '', '', '', new Date(),'',[],[],[], 0 ),[],false, [])
  recomid!: number
  userid!: number
  

  constructor(private recommendationService: RecommendationService, private router: ActivatedRoute, public loginService: StubLoginService, public bookService: BookService){ 
    this.router.params.subscribe((params)=>{
      this.recomid = params['id']
    })

    this.router.url.subscribe((u) => {
      this.volver.url = ['app/'+u[0].path]
    })

    this.userid = this.loginService.getSignedUser().id

  }
  
  
  async ngOnInit(){
    this.recom = await this.recommendationService.getRecomm(this.recomid)
    this.recomEdit = structuredClone(this.recom)
  }
  
  cancelEdit() {
    this.editMode = false
  }

  saveEdit() {
    this.recommendationService.updateRecomData(this.userid, this.recomEdit )
    this.editMode = false
    alert( JSON.stringify( this.recomEdit ) )
  }

  setEditMode() { this.editMode = true }
  
  titleEdit(e: Event){
    this.recomEdit.title = (e.target as HTMLInputElement).value
  }

  descriptionEdit(e: Event){
    this.recomEdit.description = (e.target as HTMLInputElement).value
  }
}
