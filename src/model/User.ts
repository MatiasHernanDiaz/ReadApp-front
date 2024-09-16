import { Injectable } from "@angular/core"
import { Book } from "./Book"
import { Recommendation } from "./Recommendation"


export class User {
    lastName: string
    firstName: string
    username: string
    birthday: Date
    email: string
    readTimeMinAvg: number
    readMode: ReadMode
    searchCriteria: SearchCriteria[]
    avatar: string

    constructor( 
        lastName: string, 
        firstName: string, 
        username: string, 
        birthday: Date, 
        email: string, 
        readTimeMinAvg: number,
        readMode: ReadMode = readerModes.avgReader, 
        searchCriteria: SearchCriteria[] = [],
        avatar: string = ''
    ) {
        this.lastName = lastName
        this.firstName = firstName
        this.username = username
        this.birthday = birthday
        this.email = email
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

@Injectable({ providedIn: 'root' })
export class StubLoginService {
    // TODO: inicialización temporal hasta que se implemente el flujo de autenticación
    private signedUser?: User = new User(
        "Simpson", 
        "Homero", 
        "hsimpson", 
        new Date(1968, 4, 4), 
        'homer@simps.com', 
        100, 
        readerModes.avgReader, 
        [] ,
        'assets/avatar.jpeg'
    )

    // TODO: provisorio hasta que tengamos un servicio externo
    dummyUserPayloads = [
        {
            lastName: "Simpson",
            firstName: "Homero",
            username: "hsimpson", 
            password: "simpsonfamily",
            birthday: new Date(1968, 4, 4), 
            email: 'homer@simps.com', 
            readTimeAvg: 100, 
            readerMode : readerModes.avgReader, 
            searchCriterial : [] , 
            avatar: 'assets/avatar.jpeg'

        },
        {
            lastName: "Simpson",
            firstName: "Marge",
            username: "msimpson", 
            password: "simpsonfamily",
            birthday: new Date(1970, 4, 4), 
            email: 'marge@simps.com', 
            readTimeAvg: 110,
            readerMode : readerModes.avgReader, 
            searchCriterial : [] , 
            avatar: 'assets/avatar.jpeg'

        },
        {
            lastName: "Simpson",
            firstName: "Bart",
            username: "bsimpson", 
            password: "simpsonfamily",
            birthday: new Date(1989, 4, 4), 
            email: 'bart@simps.com', 
            readTimeAvg: 80,
            readerMode : readerModes.avgReader, 
            searchCriterial : [] , 
            avatar: 'assets/avatar.jpeg'

        },
        {
            lastName: "Simpson",
            firstName: "Lisa",
            username: "lsimpson", 
            password: "simpsonfamily",
            birthday: new Date(1991, 4, 4), 
            email: 'lisa@simps.com', 
            readTimeAvg: 150,
            readerMode : readerModes.avgReader, 
            searchCriterial : [] , 
            avatar: 'assets/avatar.jpeg'

        }
    ] 

    login( credentials: { username: string, password: string }) {
        const userData: User & { password: string } = this.dummyUserPayloads.find( data => data.username === credentials.username ) as unknown as User & { password: string }

        if( ! userData || userData.password !== credentials.password ) {
            return { ok: false, res: "Credenciales inválidas."}
        }

        this.signedUser = new User(
            userData.lastName,
            userData.firstName,
            userData.username,
            userData.birthday,
            userData.email,
            userData.readTimeMinAvg,
            userData.readMode,
            userData.searchCriteria
        )

        return { ok: true, res: this.getSignedUser() }
    }

    logout() {
        this.signedUser = undefined
    }

    getSignedUser() {
        return new User(
            this.signedUser?.lastName ?? '',
            this.signedUser?.firstName ?? '',
            this.signedUser?.username ?? '',
            this.signedUser?.birthday ?? new Date(),
            this.signedUser?.email ?? '',
            this.signedUser?.readTimeMinAvg ?? 0,
            this.signedUser?.readMode,
            this.signedUser?.searchCriteria,
            this.signedUser?.avatar
        )
    }

    updateSignedUserData( newUserData: User ) {
        this.signedUser = new User(
            newUserData?.lastName ?? '',
            newUserData?.firstName ?? '',
            newUserData?.username ?? '',
            newUserData?.birthday ?? new Date(),
            newUserData?.email ?? '',
            newUserData?.readTimeMinAvg ?? 0,
            newUserData?.readMode,
            newUserData?.searchCriteria,
            newUserData?.avatar
        )
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