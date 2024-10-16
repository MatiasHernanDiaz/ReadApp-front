import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
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
import { Book } from '@src/app/model/Book'
import { User } from '@src/app/model/User'



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
  recom: RecomEdit = new RecomEdit('','',false,1,{id:-1,fullName:''},false, false, [], [])
  recomEdit: RecomEdit = new RecomEdit('','',false,1,{id:-1,fullName:''},false, false, [], [])
  recomid!: number
  useridLog!: number
  loading = true
  error = {timestamp: '', status: 0, error: '', message: '', path: ''}
  message = {title: 'No puedes editar esta recomendacion', btnMsj:'Cerrar'}
  booksToSearch: Array<Book> = [] 
  close = true
  // canRating = 'false'
  

  

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
      this.recommendationService.getRecomm(this.recomid, this.useridLog).then((res)=>{
      this.recom = res
      this.recomEdit = res
      console.log('RecomEdit >>>>>> ', this.recom)
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

  saveEdit() {
      this.recommendationService.updateRecomEdit(this.useridLog, this.recomEdit ).then((res) =>{
      this.recomEdit = res
      this.recomEditToRecom()
      this.editMode = false
    }).catch((err) =>{
      this.error = err.error
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


  
  goToAddBook(){
    console.log('viajo a la pag de libros, que deberia ser hija de esta para mi')
  }
  
  getNewRating(recom: RecomEdit){
    this.editMode = false
    this.recom = recom
  }


  async findBooks( searchWord: string ) {
    this.booksToSearch = await this.bookService.searchBooks( this.loginService.getSignedUser(), searchWord )
  }

  async loadNewFriend( newFriend: User ) {
    const newFriendList = await this.userService.loadFriend( this.loginService.getSignedUser(), newFriend )
    this.friends = newFriendList.map( fri => User.fromUserJSON(fri) )
  }
  
}
