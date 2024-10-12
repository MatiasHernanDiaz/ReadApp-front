import { Book } from "./Book"
import { Recommendation } from "./Recommendation"

export class User {
    id: number
    lastName: string
    firstName: string
    username: string
    birthday: Date
    email: string
    nativeLanguage: Language
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
        nativeLanguage: Language = Language.SPANISH,
        friends: User[] ,
        readBooks: Book[],
        readToBooks: Book[],
        readTimeMinAvg: number = 100,
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
        this.nativeLanguage = nativeLanguage
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

    editProfileJSON() {
        console.log("readmode", this.readMode)
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.username,
            searchCriteria: this.searchCriteria.map( cri => cri.toCustomString()),
            email: this.email,
            birthday: this.birthday,
            nativeLanguage: this.nativeLanguage,
            readTimeMinAvg: this.readTimeMinAvg,
            readMode: this.readMode.toCustomString(),
            avatar: this.avatar
        }
    }
  }


export interface ReadMode {
    toCustomString(): string
    readTime( libro: Book, usuario: User ): number
}


export class AvgReader implements ReadMode {
    toCustomString(): string { return "Promedio" }
    readTime( book: Book, user: User ) { return user.baseReadTime( book ) }
}


// TODO: Implementar los método correctos
export class AnxiousReader implements ReadMode {
    toCustomString(): string { return "Ansioso" }
    readTime( book: Book, user: User ) { return user.baseReadTime( book ) }
}


export class FanaticReader implements ReadMode {
    toCustomString(): string { return "Fanático" }
    readTime( book: Book, user: User ) { return user.baseReadTime( book ) }
}


export class RecurrentReader implements ReadMode {
    toCustomString(): string { return "Recurrente" }
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
    toCustomString(): string
}

export class Cautious implements SearchCriteria {
    // TODO: Implementar algún día
    isAdvisable( recom: Recommendation ) { return recom && true }
    toCustomString() { return "Precavido" }
}

export class Claimant implements SearchCriteria {
    // TODO: Implementar algún día
    isAdvisable( recom: Recommendation ) { return recom && true }
    toCustomString() { return "Demandante" }
}

export class GreatReader implements SearchCriteria {
    // TODO: Implementar algún día
    isAdvisable( recom: Recommendation ) { return recom && true }
    toCustomString() { return "Leedor" }
}

export class Nativist implements SearchCriteria {
    // TODO: Implementar algún día
    isAdvisable( recom: Recommendation ) { return recom && true }
    toCustomString() { return "Nativista" }
    
}

export class Polyglot implements SearchCriteria {
    // TODO: Implementar algún día
    isAdvisable( recom: Recommendation ) { return recom && true }
    toCustomString() { return "Políglota" }
}

export class Inconstant implements SearchCriteria {
    // TODO: Implementar algún día
    isAdvisable( recom: Recommendation ) { return recom && true }
    toCustomString() { return "Cambiante" }
}

export class Experiencied implements SearchCriteria {
    // TODO: Implementar algún día
    isAdvisable( recom: Recommendation ) { return recom && true }
    toCustomString() { return "Experimentado" }
}

export class Calculator implements SearchCriteria {
    // TODO: Implementar algún día
    isAdvisable( recom: Recommendation ) { return recom && true }
    toCustomString() { return "Calculador" }
}
 

export enum Language {
    SPANISH = "SPANISH",
    ENGLISH = "ENGLISH",
    GERMAN = "GERMAN",
    PORTUGUESE = "PORTUGUESE",
    RUSSIAN = "RUSSIAN",
    ITALIAN = "ITALIAN",
    MANDARIN = "MANDARIN",
    ARAB = "ARAB",
    HINDI = "HINDI",
    FRENCH = "FRENCH",
    BENGALI = "BENGALI",
    JAPANESE = "JAPANESE"
}