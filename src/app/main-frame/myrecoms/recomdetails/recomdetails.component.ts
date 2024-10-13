import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Recommendation } from '@src/app/model/Recommendation'
import { Language, User } from '@src/app/model/User'
import { RecommendationService } from '@src/app/services/Recom/recommendation.service'
import { RatingComponent } from '@src/app/components/rating/rating.component'
import { StubLoginService } from '@src/app/services/UserService'
import { CommonModule } from '@angular/common'
import { BookComponent } from '@src/app/components/book/book.component'
import { BtnNavigateComponent } from "../../../components/btn-navigate/btn-navigate.component"
import { BookService } from '@src/app/services/Book/book.service'
import { SpinnerComponent } from '@src/app/components/spinner/spinner.component'
import { RecomEdit } from '@src/app/model/RecomEdit'
import { MsjComponent } from '@src/app/components/msj/msj.component'


@Component({
  selector: 'app-recomdetails',
  standalone: true,
  imports: [RatingComponent, CommonModule, BookComponent, BtnNavigateComponent, SpinnerComponent, MsjComponent],
  templateUrl: './recomdetails.component.html',
  styleUrl: './recomdetails.component.css'
})
export class RecomdetailsComponent {

  volver = {action:'Volver', url:['app/myrecoms']}
  editMode = false
  recom: Recommendation = new Recommendation(0,'','',0,0,'',[],new User(0, '', '', '', new Date(),'', Language.SPANISH,[],[],[], 0 ),[],false, [])
  recomEdit: RecomEdit = new RecomEdit('','',false,1,{id:-1})
  recomid!: number
  userid!: number
  loading = true
  error = {timestamp: '', status: 0, error: '', message: '', path: ''}
  message = {title: 'No puedes editar esta recomendacion', btnMsj:'Crrrar'}
  close = true

  

  constructor(private recommendationService: RecommendationService, private router: ActivatedRoute, public loginService: StubLoginService, public bookService: BookService){ 
    this.router.params.subscribe((params)=>{
      this.recomid = params['id']
    })

    this.router.url.subscribe((u) => {
      this.volver.url = ['app/'+u[0].path]
    })

    this.userid = this.loginService.getSignedUser().id

    console.log('hay error ',this.isError)
  }
  
  isLoading(){
    if(this.recom.title != ''){
      this.loading = false
    }
  }
  
  
  async ngOnInit(){
    await this.recommendationService.getRecomm(this.recomid).then((res)=>{
      this.recom = res
      this.recomEdit = res
      console.info('Recom completa ->', this.recom)
      this.isLoading()
    })
  }

  recomEditToRecom(){ 
    this.recom.creator.id = this.recomEdit.creator.id
    this.recom.title = this.recomEdit.title 
    this.recom.description = this.recomEdit.description 
    this.recomEdit.publicIs = this.recomEdit.publicIs 
  }
  
  cancelEdit() {
    this.editMode = false
  }

  async saveEdit() {

    await this.recommendationService.updateRecomEdit(this.userid, this.recomEdit ).then((res) =>{
      this.recomEdit = res
      this.recomEditToRecom()
      this.editMode = false
      console.info('recom editada: ', this.recomEdit)
    }).catch((err) =>{
      this.error = err.error
      this.ngOnInit() //????? Es legal? o marche preso 30 años??
      this.editMode = false
    })
  }

  setEditMode() { 
    this.editMode = true
    this.close = true
    this.error.message = ''
  }
  
  titleEdit(e: Event){
    this.recomEdit.title = (e.target as HTMLInputElement).value
  }

  descriptionEdit(e: Event){
    this.recomEdit.description = (e.target as HTMLInputElement).value
  }

  get isError(){
    return this.error.message == ''
  }

  setClose(evClose: boolean){

    console.log('antes del evento close', this.close, ' y error', this.isError )
    this.close = evClose
    console.log('antes del evento close', this.close, ' y error', this.isError )
  }
}
