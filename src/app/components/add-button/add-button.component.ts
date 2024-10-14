import { Component, Input } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { bootstrapPlusCircleFill } from '@ng-icons/bootstrap-icons'
import { NgIconComponent, provideIcons } from '@ng-icons/core'


@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [FormsModule, NgIconComponent],
  viewProviders: [provideIcons({ bootstrapPlusCircleFill })],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.css'
})
export class AddButtonComponent<T extends { displayName: string }> {
  @Input() searchService: ( searchWord: string ) => Promise<T[]> = () => new Promise( () => [] )
  @Input() loadService: ( item: T ) => Promise<void> = ( item: T) => new Promise( () => console.log(item.displayName) )

  displaySelector = false
  searchWord = ''
  itemsToDisplay = [] as T[]


  toggleSelector() { 
    this.displaySelector = !this.displaySelector 
    this.itemsToDisplay = []
    this.searchWord = ''
  }

  async search( ev: { key: string} ) {
    if( ev.key === 'Enter' ) {
      this.itemsToDisplay = await this.searchService( this.searchWord )
      this.searchWord = ''
    } else if( ev.key === 'Escape' ) {
      this.searchWord = ''
      this.itemsToDisplay = []
    }
  }

  async load( item: T) {
    this.loadService( item )
    this.displaySelector = false
    this.searchWord = ''
    this.itemsToDisplay = []
  }
}
