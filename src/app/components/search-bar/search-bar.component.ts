import { Component } from '@angular/core'
import { DataService } from '@src/model/DataService'

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
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

}
