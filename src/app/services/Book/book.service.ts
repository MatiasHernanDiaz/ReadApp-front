import { Book, BookToJSON } from '@src/app/model/Book'
import { Injectable } from '@angular/core'
import { Service } from '@src/app/services/AbstractService1'
import { lastValueFrom } from 'rxjs'
import { pathBook } from '@src/app/model/Path'


@Injectable({
  providedIn: 'root'
})
export class BookService extends Service<Book>{

  async getAllBooks(text?: string): Promise<Book[]> {
    const url = pathBook.pathBook(text)
    const book$ = this.httpClient.get<BookToJSON[]>(url)
    const booksJSON = await lastValueFrom(book$)
    return booksJSON.map((BookJSON) => Book.fromBookJSON(BookJSON))
  }

}

  
  // searchBook(searchWord: string): Promise<Book[]>{
  //   const books: Array<Book> = [new Book()]
  //   books[0].title = searchWord

  //       return new Promise( () => books )
  // }

  // loadBook(): Promise<void>{
  //   return new Promise( () => {
  //     console.log('estoy cargando un libro')
  // })
  // }

