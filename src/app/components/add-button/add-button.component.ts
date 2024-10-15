import { Component, EventEmitter, Input, Output } from '@angular/core'
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
  @Input() itemsToDisplay: T[] = []
  @Output() searchAction: EventEmitter<string> = new EventEmitter<string>()
  @Output() loadItemAction: EventEmitter<T> = new EventEmitter<T>()

  displaySelector = false
  searchWord = ''
  // itemsToDisplay = [] as T[]

  toggleSelector() { 
    this.displaySelector = !this.displaySelector 
    this.itemsToDisplay = []
    this.searchWord = ''
  }

  async search( ev: { key: string} ) {
    if( ev.key === 'Enter' ) {
      // this.itemsToDisplay = await this.searchService( this.loginService.getSignedUser(), this.searchWord )
      this.searchAction.emit(this.searchWord)
      this.searchWord = ''
    } else if( ev.key === 'Escape' ) {
      this.searchWord = ''
      this.itemsToDisplay = []
    }
  }

  async load( item: T) {
    this.loadItemAction.emit( item )
    this.displaySelector = false
    this.searchWord = ''
    this.itemsToDisplay = []
  }
}
