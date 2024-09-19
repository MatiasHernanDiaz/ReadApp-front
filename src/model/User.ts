import { Injectable } from "@angular/core"
import { Book } from "./Book"
import { Recommendation } from "./Recommendation"



export class User {
    lastName: string
    firstName: string
    username: string
    birthday: Date
    email: string
    friends: User[]
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
        friends: User[] ,
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
        this.friends = friends
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
    private localStorageKey = 'signedUser'

    // TODO: inicialización temporal hasta que se implemente el flujo de autenticación
    private signedUser?: User = new User(
        "Simpson", 
        "Homero", 
        "hsimpson", 
        new Date(1968, 4, 4), 
        'homer@simps.com', 
        [],
        100, 
        readerModes.avgReader, 
        [] ,
        'assets/avatar.jpeg',
    )
    constructor() {
        const storedUser = localStorage.getItem(this.localStorageKey)
        if (storedUser) {
            const userData = JSON.parse(storedUser)
            this.signedUser = new User(
                userData.lastName,
                userData.firstName,
                userData.username,
                new Date(userData.birthday),
                userData.email,
                userData.friends,
                userData.readTimeMinAvg,
                userData.readMode,
                userData.searchCriteria,
                userData.avatar
            )
        }
    }


    // TODO: provisorio hasta que tengamos un servicio externo
    dummyUserPayloads = [
        {
            lastName: "Simpson",
            firstName: "Homero",
            username: "hsimpson", 
            password: "mandarina",
            birthday: new Date(1968, 4, 4), 
            email: 'homer@simps.com',
            friends: [
                {username: "ccarlson"},
                {username: "msimpson"}, 
                {username: "bsimpson"},
                {username: "mvanhouten"},
                {username: "bgumble"},
                {username: "lsimpson"},     
            ], 
            readTimeAvg: 100, 
            readerMode : readerModes.avgReader, 
            searchCriterial : [] , 
            avatar: 'assets/avatar.jpeg',
        },
        {
            lastName: "Simpson",
            firstName: "Marge",
            username: "msimpson", 
            password: "mandarina",
            birthday: new Date(1970, 4, 4), 
            email: 'marge@simps.com',
            friends: [
                {username: "hsimpson"},
                {username: "lsimpson"}, 
                {username: "bsimpson"},
                {username: "sbouvier"}, 
                {username: "pbouvier"}
            ],
            readTimeAvg: 110,
            readerMode : readerModes.avgReader, 
            searchCriterial : [] , 
            avatar: 'assets/marge.jpg',
            
        },
        {
            lastName: "Simpson",
            firstName: "Bart",
            username: "bsimpson", 
            password: "mandarina",
            birthday: new Date(1989, 4, 4), 
            email: 'bart@simps.com',
            friends: [
                {username: "ccarlson"}, 
                {username: "hsimpson"},
                {username: "mvanhouten"},
                {username: "bgumble"},
                {username: "nmuntz"}, 
                
            ],
            readTimeAvg: 80,
            readerMode : readerModes.avgReader, 
            searchCriterial : [] , 
            avatar: 'assets/bart.jpg',
            
        },
        {
            lastName: "Simpson",
            firstName: "Lisa",
            username: "lsimpson", 
            password: "mandarina",
            birthday: new Date(1991, 4, 4), 
            email: 'lisa@simps.com', 
            friends: [
                
                {username: "msimpson"}, 
                {username: "hsimpson"},
                {username: "mvanhouten"},
                {username: "bgumble"},
                {username: "bsimpson"}, 
                {username: "sbouvier"},
                {username: "pbouvier"},
               
            ],
            readTimeAvg: 150,
            readerMode : readerModes.avgReader, 
            searchCriterial : [] , 
            avatar: 'assets/lisa.jpeg',
           
        },
        {
            lastName: "Van Houten",
            firstName: "Milhouse",
            username: "mvanhouten",
            password: "bluehair",
            birthday: new Date(1989, 7, 1), 
            email: 'milhouse@simps.com', 
            friends: [
                {username: "msimpson"}, 
                {username: "bsimpson"},
                {username: "hsimpson"},
                {username: "lsimpson"},
            ],
            readTimeAvg: 120,
            readerMode : readerModes.avgReader, 
            searchCriterial : [], 
            avatar: 'assets/milhouse.jpg',
            
        },
        {
            lastName: "Gumble",
            firstName: "Barney",
            username: "bgumble",
            password: "duffbeer",
            birthday: new Date(1956, 3, 20), 
            email: 'barney@simps.com',
            friends: [
                {username: "ccarlson"},
                {username: "msimpson"}, 
                {username: "bsimpson"},
                {username: "mvanhouten"},
                {username: "hsimpson"},
                {username: "nmuntz"}, 
            ],
            readTimeAvg: 90,
            readerMode : readerModes.avgReader, 
            searchCriterial : [], 
            avatar: 'assets/barney.jpg',
            
        },
        {
            lastName: "Bouvier",
            firstName: "Selma",
            username: "sbouvier",
            password: "iguana123",
            birthday: new Date(1951, 6, 2), 
            email: 'selma@simps.com', 
            friends: [
                {username: "msimpson"}, 
                {username: "bsimpson"},
                {username: "mvanhouten"},
                {username: "lsimpson"},
                {username: "pbouvier"},
            ],
            readTimeAvg: 100,
            readerMode : readerModes.avgReader, 
            searchCriterial : [], 
            avatar: 'assets/selma.png',
            
        },
        {
            lastName: "Bouvier",
            firstName: "Patty",
            username: "pbouvier",
            password: "cigars456",
            birthday: new Date(1951, 6, 2), 
            email: 'patty@simps.com',
            friends: [
                {username: "ccarlson"},
                {username: "msimpson"}, 
                {username: "lsimpson"},
                {username: "sbouvier"},
            ],
            readTimeAvg: 110,
            readerMode : readerModes.avgReader, 
            searchCriterial : [], 
            avatar: 'assets/patty.png',
        },
        {
            lastName: "Muntz",
            firstName: "Nelson",
            username: "nmuntz",
            password: "ha-ha123",
            birthday: new Date(1991, 9, 30), 
            email: 'nelson@simps.com', 
            friends: [
                {username: "ccarlson"},
                {username: "bsimpson"},
                {username: "mvanhouten"},
                {username: "bgumble"},
                {username: "lsimpson"},
                {username: "hsimpson"}, 
                 
            ],
            readTimeAvg: 80,
            readerMode : readerModes.avgReader, 
            searchCriterial : [], 
            avatar: 'assets/nelson.jpg',
        },
        {
            lastName: "Carlson",
            firstName: "Carl",
            username: "ccarlson",
            password: "nuclear123",
            birthday: new Date(1955, 3, 20), 
            email: 'carl@simps.com',
            friends: [
                {username: "msimpson"}, 
                {username: "bsimpson"},
                {username: "mvanhouten"},
                {username: "bgumble"},
                {username: "hsimpson"},
                {username: "nmuntz"}, 
                
            ],
            readTimeAvg: 130,
            readerMode : readerModes.anxiousReader, 
            searchCriterial : [], 
            avatar: 'assets/carl.jpg',
           
        }      
    ] 

    //login( credentials: { username: string, password: string }) {
    //const userData: User & { password: string } = this.dummyUserPayloads.find( data => data.username === credentials.username ) 
    //as unknown as User & { password: string }
        
    login(credentials: { email: string, password: string }) {
        const userData: User & { password: string } = this.dummyUserPayloads.find(data => data.email === credentials.email) as unknown as User & { password: string }
        
        if( ! userData || userData.password !== credentials.password ) {
            return { ok: false, res: "Credenciales inválidas."}
        }

        this.signedUser = new User(
            userData.lastName,
            userData.firstName,
            userData.username,
            userData.birthday,
            userData.email,
            userData.friends,
            userData.readTimeMinAvg,
            userData.readMode,
            userData.searchCriteria,
            userData.avatar
        )

        localStorage.setItem(this.localStorageKey, JSON.stringify(this.signedUser))

        return { ok: true, res: this.getSignedUser() }
    }

    logout() {
        this.signedUser = undefined
        localStorage.removeItem(this.localStorageKey)
    }

    getSignedUser() {
        return new User(
            this.signedUser?.lastName ?? '',
            this.signedUser?.firstName ?? '',
            this.signedUser?.username ?? '',
            this.signedUser?.birthday ?? new Date(),
            this.signedUser?.email ?? '',
            this.signedUser?.friends?? [],
            this.signedUser?.readTimeMinAvg ?? 0,
            this.signedUser?.readMode,
            this.signedUser?.searchCriteria,
            this.signedUser?.avatar,
        )
    }

    updateSignedUserData( newUserData: User ) {
        this.signedUser = new User(
            newUserData?.lastName ?? '',
            newUserData?.firstName ?? '',
            newUserData?.username ?? '',
            newUserData?.birthday ?? new Date(),
            newUserData?.email ?? '',
            newUserData?.friends??[],
            newUserData?.readTimeMinAvg ?? 0,
            newUserData?.readMode,
            newUserData?.searchCriteria,
            newUserData?.avatar,
            
        )
    }

    getUsers(): User[] {
        // Primero crea todos los usuarios
        const users = this.dummyUserPayloads.map(data => new User(
            data.lastName,
            data.firstName,
            data.username,
            data.birthday,
            data.email,
            [], // Amigos se asignarán después
            data.readTimeAvg,
            data.readerMode,
            data.searchCriterial,
            data.avatar
        ))
    
        // Crea un mapa para acceder rápidamente a los usuarios por username
        const userMap = new Map(users.map(user => [user.username, user]))
    
        // Ahora asigna los amigos
        users.forEach(user => {
            const userData = this.dummyUserPayloads.find(data => data.username === user.username)
            if (userData?.friends) {
                user.friends = userData.friends
                    .map(friendData => userMap.get(friendData!.username) || new User(
                        '', '', '', new Date(), '', [], 0, readerModes.avgReader, [], ''
                    ))
            }
        })
    
        return users
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