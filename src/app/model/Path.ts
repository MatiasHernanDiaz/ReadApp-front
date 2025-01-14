

abstract class Path{

    _pathBasic = 'http://localhost:9000/'

    entity!: string

    pathBasic(): string{
        return this._pathBasic + this.entity
    }

    pathEntityCRUD(userId: number, entityId: number, action: string, entityName?: string): string{
        let path: string = this.pathBasic()
        switch(action){
        //case 'create': path += '/create?userid=' + userId + '&entityid=' + entityId
        case 'create': path += '/create/' + entityName + '?userid=' + userId + '&entityid=' + entityId
        break 
        case 'read': path += '/'+ entityId + '/' + userId
        break
        //case 'update': path += '/update?userid=' + userId + '&entityid=' + entityId
        case 'update': path += '/update/' + entityId + '?userid=' + userId
        break
        case 'delete': path += '/delete/' + entityId + '/' + userId
        break
        }
        return path
    }
    
    pathEntityId(entityId: number): string{
        return this.pathBasic() + '/' + entityId
    }
    
}

//======================================================================================================

class PathRecom extends Path {

    override entity = 'recommendations'

    pathRecom(userId?: number, wordToFind?: string): string{
        if(userId){
        return this.pathBasic() + '?userid=' + userId + '&text=' + wordToFind 
        }
        else if(wordToFind){
        return this.pathBasic() + '?text=' + wordToFind 
        }
        else{
        return this.pathBasic()
        }
    }

    ratingCRUD(recomid: number ,action:string): string{
        let path: string = this.pathBasic()
        switch(action){
            case('create'): path += '/create/rating?recomid=' + recomid
        }
        return path
    }

    recomCreate(){
        let path: string = this.pathBasic()
        return path += '/create/recom'
    }

    canRating(userid: number, recomid: number): string{
        let path: string = this.pathBasic()
        return path += '/rating?userid=' + userid + '&recomid=' + recomid
    }

    deleteBookToRecom(userid: number, recomid: number, bookid: number){
        return this.pathBasic() + '/delete/' + userid + '/' + recomid + '/' + bookid
    }


}

//======================================================================================================

class PathBook extends Path {
  override entity: string = 'books'

  pathBook(wordToFind?: string): string {
    if (wordToFind) {
      return this.pathBasic() + '?text=' + wordToFind
    }
    else {
      return this.pathBasic()
    }
  }
  pathToRead(userID: number, wordToFind?: string): string {

    if (wordToFind) {
      return this.pathBasic() + '/nottoread' + '/' + String(userID) + '?text=' + wordToFind
    }
    else {
      return this.pathBasic() + '/nottoread' + '/' + String(userID)
    }

  }

  pathRead(userID: number, wordToFind?: string): string {
    if (wordToFind) {
      return this.pathBasic() + '/notread' + '/' + String(userID) + '?text=' + wordToFind
    }
    else {
      return this.pathBasic() + '/notread' + '/' + String(userID)
    }
  }

  getAddBook( recomid: number, userid: number ): string{
    
    return this.pathBasic() + '/' + recomid + '/addbook?userid=' + userid
  }

  getCandidatesToBookOfRecom( recomid: number, userLogId: number, searchWord?:string ): string{
    return this.pathBasic() + '/' + recomid + '/candidatestobook?userid=' + userLogId + '&search=' + searchWord
  }
}

//======================================================================================================

class PathUser extends Path {

    override entity: string = 'users'

    getAllFriends(userid: number){
        return this.pathBasic() + '/' + userid + '/friends'
    }

    getDelFriend(userId: number, friendId: number) {
      const url = `${this.pathBasic()}/${userId}/delfriend?friendid=${friendId}`
      console.log('URL generada para eliminar amigo:', url) // Verifica la URL
      return url
    }

    getBookToRead(userid: number, toread: boolean){
        if(toread){
            return this.pathBasic() + '/' + userid + '/bookstoread?toread=true'
        }
        else{
            return this.pathBasic() + '/' + userid + '/bookstoread?toread=false'
        }
    }
    getAddBook(userid: number, toread: boolean) {
      if (toread) {
        return `${this.pathBasic()}/${userid}/addtoread`
      }
      else {
        return `${this.pathBasic()}/${userid}/addreadbook`
      }
  }

    getDelBook(userid: number, toread: boolean, bookID: number) {
      if (toread) {
        return `${this.pathBasic()}/${userid}/deltoread` + '?bookid=' + bookID
      }
      else {
        return `${this.pathBasic()}/${userid}/delreadbook` + '?bookid=' + bookID
     }
    }

    getEditProfile() {
        return `${ this.pathBasic() }/editprofile`
    }

    getCandidatesToFriend(userid: number, searchWord: string) {
        return `${ this.pathBasic()}/${ userid }/candidatestofriend${ searchWord ? `?search=${ searchWord }` : ''}`
    }

    getAddFriend(userid: number) {
        return `${ this.pathBasic()}/${ userid }/addfriend`
    }

    favoriteCRUD(userId: number, entityId: number, action: string): string{
        let path: string = this.pathBasic()
        switch(action){
        case 'addFavorite': path += '/favorites/'+ userId + '/' + entityId
        break
        case 'removeFavorite': path += '/favorites/'+ userId + '/' + entityId
        break
        case 'getFavorites': path += '/favorites/'+ userId
        break
        }
        return path
        }
}

//==============================================================================
class PathLogin extends Path {

    override entity: string = 'auth'

    getSignedUser() { return `${ this.pathBasic() }/login` }
    login() { return `${ this.pathBasic() }/login` }
    logout() { return `${ this.pathBasic() }/logout`}
}


//======================================================================================================

export const pathRecom: PathRecom = new PathRecom()
export const pathBook: PathBook = new PathBook()
export const pathUser: PathUser = new PathUser()
export const pathLogin: PathLogin = new PathLogin()

