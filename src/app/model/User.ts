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
        searchCriteria: SearchCriteria[] = [SearchCriteria.GreatReader],
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

    bookReadTime( book: Book ) {
        return this.readMode.readTime( book, this )
    }

    recomReadTime( recom: Recommendation ) {
        return recom.books.reduce(( ac, book ) => ac + this.bookReadTime(book), 0)
    }

    get displayName(){
        return this.firstName + ' ' + this.lastName
    }

    userToJSON(): UserToJSON {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.username,
            searchCriteria: this.searchCriteria,
            email: this.email,
            birthday: this.birthday,
            nativeLanguage: this.nativeLanguage,
            readTimeMinAvg: this.readTimeMinAvg,
            readMode: this.readMode.toCustomString(),
            avatar: this.avatar,
            friends: this.friends,
            readBooks: this.readBooks,
            readToBooks: this.readToBooks
        }
    }

    static fromUserJSON(userJSON: UserToJSON): User {
        return new User(
            userJSON.id,
            userJSON.lastName,
            userJSON.firstName,
            userJSON.username,
            userJSON.birthday,
            userJSON.email,
            userJSON.nativeLanguage,
            userJSON.friends,
            userJSON.readBooks,
            userJSON.readToBooks,
            userJSON.readTimeMinAvg,
            User.fromReadModeString(userJSON.readMode),
            userJSON.searchCriteria,
            userJSON.avatar
        )
    }

    static fromReadModeString( readModeString: string) {
        switch( readModeString ) {
            case "Promedio":
                return new AvgReader()
            case "Ansioso":
                return new AnxiousReader()
            case "Fanático":
                return new FanaticReader()
            case "Recurrente":
                return new RecurrentReader()
            default:
                return new AvgReader()
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


export class AnxiousReader implements ReadMode {
    toCustomString(): string { return "Ansioso" }
    readTime( book: Book, user: User ) {
        if (book.isBestSeller()) {
            return user.baseReadTime(book) * 0.5
        } else {
            return user.baseReadTime(book) * 0.8
        }
    }
}


export class FanaticReader implements ReadMode {
    toCustomString(): string { return "Fanático" }
    readTime( book: Book, user: User ) {
        const extraTime = !user.readToBooks.includes(book) ? 
            book.pages > Book.largeBookPages ?
            Book.largeBookPages * 2 + (book.pages - Book.largeBookPages) :
            book.pages * 2 : 
        0

        return user.baseReadTime(book) + extraTime
    }
}

export class RecurrentReader implements ReadMode {
    toCustomString(): string { return "Recurrente" }
    readTime( book: Book, user: User ) {
        return user.baseReadTime(book) - user.baseReadTime(book) *
                ( user.readBooks.includes(book) ? 0.05: 0.01 )
    }
}

export const readerModes = {
    avgReader: new AvgReader(),
    anxiousReader: new AnxiousReader(),
    fanaticReader: new FanaticReader(),
    recurrentReader: new RecurrentReader()
}

export enum SearchCriteria {
    Cautious = "Precavido",
    Claimant = "Demandante",
    GreatReader = "Leedor",
    Nativist = "Nativista",
    Polyglot = "Políglota",
    Inconstant = "Cambiante",
    Experiencied = "Experimentado",
    Calculator = "Calculador",
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



export type UserToJSON = {
    id: number
    lastName: string
    firstName: string
    username: string
    birthday: Date
    email: string
    nativeLanguage: Language
    friends: User[]
    readBooks: Book[]
    readToBooks: Book[]
    readTimeMinAvg: number
    readMode: string
    searchCriteria: SearchCriteria[]
    avatar: string
}