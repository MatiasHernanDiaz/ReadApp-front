import { Component, Input } from '@angular/core'
import { FormsModule } from '@angular/forms'
// import { RouterOutlet } from '@angular/router'
import { SearchBarComponent } from '@src/app/components/search-bar/search-bar.component'
import { ActivatedRoute, RouterOutlet } from '@angular/router'
import { Calculator, Cautious, Claimant, Experiencied, GreatReader, Inconstant, Nativist, Polyglot, readerModes, SearchCriteria, StubLoginService, User } from '@src/model/User'
import { DataService } from '@src/model/DataService'
import { Location } from '@angular/common'

@Component({
  selector: 'recommendations-screen',
  standalone: true,
  imports: [FormsModule, RouterOutlet, SearchBarComponent],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.css'
})
export class RecommendationsScreen {

  //IDEA 1
  // constructor(private route: ActivatedRoute, public loginService: StubLoginService ){}

  // myRecom: boolean = false
  // algo: object = {}



  // ngOnInit(){
  //   this.myRecom =  this.route.snapshot.data['myRecom']
  //   console.log('this.myRecom ', this.myRecom)
  //   console.log('data.myrecom', this.route.snapshot.data['myRecom'])
  // }

  //IDEA 2

  // constructor(private route: ActivatedRoute, public loginService: StubLoginService, public dataService : DataService, private location: Location ){}

  // myRecoms: boolean = false

  // ngOnInit(){
  //   this.myRecoms = this.dataService.getData()
  //   console.log('deberia estar renderecizando por cada click')
  // }

}