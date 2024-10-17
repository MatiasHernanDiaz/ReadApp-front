import { Injectable } from "@angular/core"
import { Book, BookToJSON } from "@src/app/model/Book"
import { User, UserToJSON } from "@src/app/model/User"
import { Service } from '@src/app/services/AbstractService/abstract.service'
import { lastValueFrom } from "rxjs"
import { pathUser } from "@src/app/model/Path"



@Injectable({ providedIn: 'root' })
export class UserService extends Service<User>{
    
    //ESTE ES EL SERVICE NUEVO QUE VA A QUEDAR, MIGREN TODO LO QUE LES SIRVA DEL STUB
    
    async getUser(userid: number): Promise<User>{
        const url = pathUser.pathEntityId(userid)
        const user$ = this.httpClient.get<UserToJSON>(url)
        const userJSON = await lastValueFrom(user$)
        return User.fromUserJSON(userJSON)
    }

    async getAllFriends(userid: number): Promise<User[]>{
        const url = pathUser.getAllFriends(userid)
        const user$ = this.httpClient.get<UserToJSON[]>(url)
        const userJSON = await lastValueFrom(user$)
        return userJSON.map((res) => User.fromUserJSON(res))
    }

    async getBookToRead(userid: number, toread: boolean): Promise<Book[]>{
        const url = pathUser.getBookToRead(userid, toread)
        console.log('url ->', url)
        const user$ = this.httpClient.get<BookToJSON[]>(url)
        const userJSON = await lastValueFrom(user$)
        return userJSON.map((res) => Book.fromBookJSON(res))
    }

    async editUser( user: User ) {
        const url = pathUser.getEditProfile()
        const payload = user.userToJSON()
        
        const recoms$ = this.httpClient.put<User>(url, payload)
        const res = await lastValueFrom(recoms$)
        return res
    }

    // Busca usuarios que podrían ser añadidos como amigos (o sea, aun no son amigos ni tampoco es el propio usuario)
    async searchFriends( user: User, searchWord: string ) {
        const url = pathUser.getCandidatesToFriend( user.id, searchWord )
        const users$ = this.httpClient.get<UserToJSON[]>(url)
        const userJSON = await lastValueFrom(users$)
        return userJSON.map((res) => User.fromUserJSON(res) )
    }

    async loadFriend( user: User, newFriend: User ) {
        const url = pathUser.getAddFriend( user.id )
        const payload = newFriend.userToJSON()

        const friend$ = this.httpClient.post<UserToJSON[]>(url, payload)
        const friend = await lastValueFrom(friend$)
        return friend
  }

  async loadToRead(user: User, newBook: Book) {
    const url = pathUser.getAddBook(user.id, true)
    const payload = newBook.bookToJSON()

    const book$ = this.httpClient.post<BookToJSON[]>(url, payload)
    const book = await lastValueFrom(book$)
    return book
  }
  async loadReadBook(user: User, newBook: Book) {
    const url = pathUser.getAddBook(user.id, false)
    const payload = newBook.bookToJSON()

    const book$ = this.httpClient.post<BookToJSON[]>(url, payload)
    const book = await lastValueFrom(book$)
    return book
  }



}
