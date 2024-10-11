

export class PathRecom {

static pathBasic(): string{
    return 'http://localhost:9000/recommendations'
}

static pathRecom(userId?: number, wordToFind?: string): string{
    if(userId){
    return PathRecom.pathBasic() + '?userid=' + userId + '&text=' + wordToFind 
    }
    else if(wordToFind){
    return PathRecom.pathBasic() + '?text=' + wordToFind 
    }
    else{
    return PathRecom.pathBasic()
    }
}

static pathRecomCRUD(userId: number, recomid: number, action: string): string{
    let path: string = PathRecom.pathBasic()
    switch(action){
    case 'create': path += '/create?userid=' + userId + '&recomid=' + recomid
    break 
    case 'read': path += '/read?userid=' + userId + '&recomid=' + recomid
    break
    case 'update': path += '/update?userid=' + userId + '&recomid=' + recomid
    break
    case 'delete': path += '/delete?userid=' + userId + '&recomid=' + recomid
    break
    }
    return path
}

static pathRecomId(recomid: number): string{
    return PathRecom.pathBasic() + '/' + recomid
}
}


//======================================================================================================

export class PathBook {

static pathBasic(): string{
    return 'http://localhost:9000/books'
}

static pathBook(userId?: number, wordToFind?: string): string{
    if(userId){
    return PathBook.pathBasic() + '?userid=' + userId + '&text=' + wordToFind 
    }
    else if(wordToFind){
    return PathBook.pathBasic() + '?text=' + wordToFind 
    }
    else{
    return PathBook.pathBasic()
    }
}

static pathBookCRUD(userId: number, bookId: number, action: string): string{
    let path: string = PathBook.pathBasic()
    switch(action){
    case 'create': path += '/create?userid=' + userId + '&bookid=' + bookId
    break 
    case 'read': path += '/read?userid=' + userId + '&bookid=' + bookId
    break
    case 'update': path += '/update?userid=' + userId + '&bookid=' + bookId
    break
    case 'delete': path += '/delete?userid=' + userId + '&bookid=' + bookId
    break
    }
    return path
}

static pathBookId(bookId: number): string{
    return PathBook.pathBasic() + '/' + bookId
}
}


//======================================================================================================

export class PathUser {

    static pathBasic(): string{
        return 'http://localhost:9000/users'
    }
    
    static pathUser(userId?: number, wordToFind?: string): string{
        if(userId){
        return PathUser.pathBasic() + '?userid=' + userId + '&text=' + wordToFind 
        }
        else if(wordToFind){
        return PathUser.pathBasic() + '?text=' + wordToFind 
        }
        else{
        return PathUser.pathBasic()
        }
    }
    
    static pathUserCRUD(userId: number, OtheruserId: number, action: string): string{
        let path: string = PathUser.pathBasic()
        switch(action){
        case 'create': path += '/create?userid=' + userId + '&otheruserid=' + OtheruserId
        break 
        case 'read': path += '/read?userid=' + userId + '&otheruserid=' + OtheruserId
        break
        case 'update': path += '/update?userid=' + userId + '&otheruserid=' + OtheruserId
        break
        case 'delete': path += '/delete?userid=' + userId + '&otheruserid=' + OtheruserId
        break
        }
        return path
    }
    
    static pathUserd(userId: number): string{
        return PathUser.pathBasic() + '/' + userId
    }
    }