import { Component  } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DataService } from '@src/model/DataService'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  constructor(public dataService: DataService){}
  data: { myrecom: boolean } = {myrecom: false}

  ngOnInit(){
    this.dataService.currentData.subscribe(newData => {
      this.data = newData
    })
  }

  search = new Search()
}

class Search{
  text: string = ''

  btnSearch(){
    //aca deberia mandar esta cadenada de text al hijo para que renderice en el for
    alert(this.text)
  }

}
