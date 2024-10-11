abstract class Path{

    _pathBasic = 'http://localhost:9000/'

    entity!: string

    pathBasic(): string{
        return this._pathBasic + this.entity
    }

    pathEntityCRUD(userId: number, entityId: number, action: string): string{
        let path: string = this.pathBasic()
        switch(action){
        case 'create': path += '/create?userid=' + userId + '&entityid=' + entityId
        break 
        case 'read': path += '/read?userid=' + userId + '&entityid=' + entityId
        break
        case 'update': path += '/update?userid=' + userId + '&entityid=' + entityId
        break
        case 'delete': path += '/delete?userid=' + userId + '&entityid=' + entityId
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

}

//======================================================================================================

class PathBook extends Path {
    override entity: string = 'books'
}

//======================================================================================================

class PathUser extends Path {

    override entity: string = 'users'

}


//======================================================================================================

export const pathRecom: PathRecom = new PathRecom()
export const pathBook: PathBook = new PathBook()
export const pathUser: PathUser = new PathUser()

