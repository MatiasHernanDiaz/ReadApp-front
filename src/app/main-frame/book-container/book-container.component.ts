import { Component, Input } from '@angular/core'
import { BookComponent } from '@src/app/components/book/book.component'
import { SearchBarComponent } from '@src/app/components/search-bar/search-bar.component'

@Component({
  selector: 'app-book-container',
  standalone: true,
  imports: [BookComponent, SearchBarComponent],
  templateUrl: './book-container.component.html',
  styleUrl: './book-container.component.css'
})
export class BookContainerComponent {

  books: Book[] = [
    {title: "El libro de Bill", imageURL:"img/Book.jpg", autor:"Alex Hirsch", pages:224, words:15000, date:new Date(2024,8,1), lenguages:"Español-English", sales:50300},
    {title: "Gaturro Gigante", imageURL:"https://images.cdn2.buscalibre.com/fit-in/360x360/cd/12/cd120253f636098c134b6b21e2d9a3a3.jpg", autor:"Nik", pages:300, words:2200, date:new Date(2024,8,8), lenguages:"Español", sales:70000},
    {title: "Llamada de Cthulhu", imageURL:"https://data.livriz.com/media/MediaSpace/F9AFB48D-741D-4834-B760-F59344EEFF34/4/3b6448a7-76ec-4173-a173-9f04ff004233/9789878354521.jpg", autor:"H.P. Lovecraft", pages:360, words:60000, date:new Date(1928,2,2), lenguages:"Español-English-Français", sales:1000000},
    { title: "Gaturro Gigante", imageURL: "https://images.cdn2.buscalibre.com/fit-in/360x360/cd/12/cd120253f636098c134b6b21e2d9a3a3.jpg", autor: "Nik", pages: 300, words: 2200, date: new Date(2024, 8, 8), lenguages: "Español", sales: 70000 },
    { title: "Gaturro Gigante", imageURL: "https://images.cdn2.buscalibre.com/fit-in/360x360/cd/12/cd120253f636098c134b6b21e2d9a3a3.jpg", autor: "Nik", pages: 300, words: 2200, date: new Date(2024, 8, 8), lenguages: "Español", sales: 70000 }
  ]

  @Input() test = false
}

type Book = {
  title: string
  imageURL: string
  autor: string
  pages: number
  words: number
  date: Date
  lenguages: string
  sales: number
}
