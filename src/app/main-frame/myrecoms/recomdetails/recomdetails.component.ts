import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Recommendation } from '@src/app/model/Recommendation'
import { Language, User } from '@src/app/model/User'
import { RecommendationService } from '@src/app/services/Recom/recommendation.service'
import { RatingComponent } from '@src/app/components/rating/rating.component'
import { CommonModule } from '@angular/common'
import { BookComponent } from '@src/app/components/book/book.component'
import { BtnNavigateComponent } from "../../../components/btn-navigate/btn-navigate.component"
import { BookService } from '@src/app/services/Book/book.service'
import { SpinnerComponent } from '@src/app/components/spinner/spinner.component'
import { RecomEdit } from '@src/app/model/RecomEdit'
import { MsjComponent } from '@src/app/components/msj/msj.component'
import { AddRatingComponent } from "../../../components/add-rating/add-rating.component"
import { LoginService } from '@src/app/services/Login/login.service'
import { bootstrapPlusCircleFill } from '@ng-icons/bootstrap-icons'
import { NgIconComponent, provideIcons } from '@ng-icons/core'



@Component({
  selector: 'app-recomdetails',
  standalone: true,
  imports: [RatingComponent, CommonModule, BookComponent, BtnNavigateComponent, SpinnerComponent, MsjComponent, AddRatingComponent, NgIconComponent],
  viewProviders: [provideIcons({ bootstrapPlusCircleFill })],
  templateUrl: './recomdetails.component.html',
  styleUrl: './recomdetails.component.css'
})
export class RecomdetailsComponent {

  volver = {action:'Volver', url:['app/myrecoms']}
  editMode = false
  recom: Recommendation = new Recommendation(0,'','',0,0,'',[],new User(0, '', '', '', new Date(),'', Language.SPANISH,[],[],[], 0 ),[],false, [])
  recomEdit: RecomEdit = new RecomEdit('','',false,1,{id:-1})
  recomid!: number
  useridLog!: number
  loading = true
  error = {timestamp: '', status: 0, error: '', message: '', path: ''}
  message = {title: 'No puedes editar esta recomendacion', btnMsj:'Cerrar'}
  close = true
  canRating = 'false'
  

  

  constructor(private recommendationService: RecommendationService, private router: ActivatedRoute, public loginService: LoginService, public bookService: BookService){ 
    this.router.params.subscribe((params)=>{
      this.recomid = params['id']
      
    })

    this.router.url.subscribe((u) => {
      this.volver.url = ['app/'+u[0].path]
    })
    this.useridLog = this.loginService.getSignedUser()!.id
  }


  
  isLoading(){
    if(this.recom.title != ''){
      this.loading = false
    }
  }
  
  
  async ngOnInit(){
      this.recommendationService.getRecomm(this.recomid).then((res)=>{
      this.recom = res
      this.recomEdit = res
      console.info('Recom completa ->', this.recom)
      this.isLoading()
      return this.recommendationService.canRating(this.useridLog, this.recom.id)
    }).then((res2)=>{
      this.canRating = res2 
      console.log('puede valorar?? >> ', this.canRating, typeof this.canRating)
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
      this.recommendationService.updateRecomEdit(this.useridLog, this.recomEdit ).then((res) =>{
      this.recomEdit = res
      this.recomEditToRecom()
      this.editMode = false
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
    this.close = evClose
  }


  async reload(){
      this.editMode = false
      this.recommendationService.getRecomm(this.recomid).then((res)=>{
      this.recom = res
      this.recomEdit = res
      console.info('Recom completa ->', this.recom)
      this.isLoading()
    })
  }

  goToAddBook(){
    console.log('viajo a la pag de libros, que deberia ser hija de esta para mi')
  }

  
}
