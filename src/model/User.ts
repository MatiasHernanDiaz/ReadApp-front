import { Injectable } from "@angular/core"


export class User {
    lastName: string
    firstName: string
    username: string
    birthday: Date
    email: string
    readTimeAvg: number
    readMode: ReadMode
    searchCriteria: SearchCriteria[]

    constructor( 
        lastName: string, 
        firstName: string, 
        username: string, 
        birthday: Date, 
        email: string, 
        readTimeAvg: number,
        readMode = new ReaderAvg(), 
        searchCriteria = []
    ) {
        this.lastName = lastName
        this.firstName = firstName
        this.username = username
        this.birthday = birthday
        this.email = email
        this.readTimeAvg = readTimeAvg
        this.readMode = readMode
        this.searchCriteria = searchCriteria
    }
  }

@Injectable({ providedIn: 'root' })
export class StubLoginService {
    // TODO: inicialización temporal hasta que se implemente el flujo de autenticación
    private signedUser?: User = new User(
        "Simpson", "Homero", "hsimpson", new Date(1968, 4, 4), 'homer@simps.com', 100
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

        },
        {
            lastName: "Simpson",
            firstName: "Marge",
            username: "msimpson", 
            password: "simpsonfamily",
            birthday: new Date(1970, 4, 4), 
            email: 'marge@simps.com', 
            readTimeAvg: 110,

        },
        {
            lastName: "Simpson",
            firstName: "Bart",
            username: "bsimpson", 
            password: "simpsonfamily",
            birthday: new Date(1989, 4, 4), 
            email: 'bart@simps.com', 
            readTimeAvg: 80,

        },
        {
            lastName: "Simpson",
            firstName: "Lisa",
            username: "lsimpson", 
            password: "simpsonfamily",
            birthday: new Date(1991, 4, 4), 
            email: 'lisa@simps.com', 
            readTimeAvg: 150,

        }
    ] 

    login( credentials: { username: string, password: string }) {
        const userData = this.dummyUserPayloads.find( data => data.username === credentials.username )

        if( ! userData || userData.password !== credentials.password ) {
            return { ok: false, res: "Credenciales inválidas."}
        }

        this.signedUser = new User(
            userData.lastName,
            userData.firstName,
            userData.username,
            userData.birthday,
            userData.email,
            userData.readTimeAvg
        )

        return { ok: true, res: this.signedUser }
    }

    logout() {
        this.signedUser = undefined
    }

    getSignedUser() {
        return new User(
            this.signedUser?.lastName || '',
            this.signedUser?.firstName || '',
            this.signedUser?.username || '',
            this.signedUser?.birthday || new Date(),
            this.signedUser?.email || '',
            this.signedUser?.readTimeAvg || 0
        )
    }

    updateSignedUserData( newUserData: User ) {
        this.signedUser = newUserData
    }
}

export interface ReadMode {
    algoParaQueCompile: string
}

export interface SearchCriteria {
    algoParaQueCompile: string
}

export class ReaderAvg implements ReadMode {
    algoParaQueCompile = "Compilá!!"
}