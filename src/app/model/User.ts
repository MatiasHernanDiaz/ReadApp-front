import { Book } from "./Book"
import { Recommendation } from "./Recommendation"

export class User {
    id: number
    lastName: string
    firstName: string
    username: string
    birthday: Date
    email: string
    friends: User[]
    readBooks: Book[] = []
    readToBooks: Book[] = []
    readTimeMinAvg: number
    readMode: ReadMode
    searchCriteria: SearchCriteria[]
    avatar: string
    

    constructor( 
        id: number,
        lastName: string, 
        firstName: string, 
        username: string, 
        birthday: Date, 
        email: string,
        friends: User[] ,
        readBooks: Book[],
        readToBooks: Book[],
        readTimeMinAvg: number,
        readMode: ReadMode = readerModes.avgReader, 
        searchCriteria: SearchCriteria[] = [],
        avatar: string = ''

    ) {
        this.id = id
        this.lastName = lastName
        this.firstName = firstName
        this.username = username
        this.birthday = birthday
        this.email = email
        this.friends = friends
        this.readBooks = readBooks
        this.readToBooks = readToBooks
        this.readTimeMinAvg = readTimeMinAvg
        this.readMode = readMode
        this.searchCriteria = searchCriteria
        this.avatar = avatar
        
    }

    baseReadTime( book: Book ) {
        return book.pages / this.readTimeMinAvg
    }

    readTime( book: Book ) {
        return this.readMode.readTime( book, this )
    }

    get displayName(){
        return this.firstName + ' ' + this.lastName
    }

  }


interface ReadMode {
    readTime( libro: Book, usuario: User ): number
}


class AvgReader implements ReadMode {
    // Para debug... ELIMINAR
    readMode = "AvgReader"

    readTime( book: Book, user: User ) { return user.baseReadTime( book ) }
}


// TODO: Implementar los método correctos
class AnxiousReader implements ReadMode {
    // Para debug... ELIMINAR
    readMode = "AnxiousReader"

    readTime( book: Book, user: User ) { return user.baseReadTime( book ) }
}


class FanaticReader implements ReadMode {
    // Para debug... ELIMINAR
    readMode = "FanaticReader"

    readTime( book: Book, user: User ) { return user.baseReadTime( book ) }
}


class RecurrentReader implements ReadMode {
    // Para debug... ELIMINAR
    readMode = "RecurrentReader"

    readTime( book: Book, user: User ) { return user.baseReadTime( book ) }
}

export const readerModes = {
    avgReader: new AvgReader(),
    anxiousReader: new AnxiousReader(),
    fanaticReader: new FanaticReader(),
    recurrentReader: new RecurrentReader()
}

export interface SearchCriteria {
    isAdvisable( recom: Recommendation ): boolean
}

export class Cautious implements SearchCriteria {
    // Para debug... ELIMINAR
    criteria = "cautious"
    // TODO: Implementar algún día
    isAdvisable( recom: Recommendation ) { return recom && true }
}

export class Claimant implements SearchCriteria {
    // Para debug... ELIMINAR
    criteria = "claimant"
    // TODO: Implementar algún día
    isAdvisable( recom: Recommendation ) { return recom && true }
}

export class GreatReader implements SearchCriteria {
    // Para debug... ELIMINAR
    criteria = "greatReader"
    // TODO: Implementar algún día
    isAdvisable( recom: Recommendation ) { return recom && true }
}

export class Nativist implements SearchCriteria {
    // Para debug... ELIMINAR
    criteria = "nativist"
    // TODO: Implementar algún día
    isAdvisable( recom: Recommendation ) { return recom && true }
}

export class Polyglot implements SearchCriteria {
    // Para debug... ELIMINAR
    criteria = "polyglot"
    // TODO: Implementar algún día
    isAdvisable( recom: Recommendation ) { return recom && true }
}

export class Inconstant implements SearchCriteria {
    // Para debug... ELIMINAR
    criteria = "inconstant"
    // TODO: Implementar algún día
    isAdvisable( recom: Recommendation ) { return recom && true }
}

export class Experiencied implements SearchCriteria {
    // Para debug... ELIMINAR
    criteria = "experiencied"
    // TODO: Implementar algún día
    isAdvisable( recom: Recommendation ) { return recom && true }
}

export class Calculator implements SearchCriteria {
    // Para debug... ELIMINAR
    criteria = "calculator"
    // TODO: Implementar algún día
    isAdvisable( recom: Recommendation ) { return recom && true }
}