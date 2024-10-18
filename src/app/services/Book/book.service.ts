import { Book, BookToJSON } from '@src/app/model/Book'
import { Injectable } from '@angular/core'
import { Service } from '@src/app/services/AbstractService1'
import { lastValueFrom } from 'rxjs'
import { pathBook } from '@src/app/model/Path'
import { RecomEdit } from '@src/app/model/RecomEdit'


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

  async searchBooks( recom: RecomEdit, userLogId: number, searchWord: string ): Promise<Book[]> {
    //que libros candidatos para una recom
    const url = pathBook.getCandidatesToBookOfRecom( recom.id, userLogId, searchWord )
    const book$ = this.httpClient.get<BookToJSON[]>(url)
    const bookJSON = await lastValueFrom(book$)
    return bookJSON.map((res) => Book.fromBookJSON(res) )
}

  async loadBook( recom: RecomEdit, newBook: Book, userid: number ): Promise<RecomEdit> {
    //cargo el libro a la recom
    const url = pathBook.getAddBook( recom.id, userid )
    const recomNewBook$ = this.httpClient.post<RecomEdit>(url, newBook)
    const recrecomNewBookom = await lastValueFrom(recomNewBook$)
    return recrecomNewBookom
}

}


