import { Injectable } from "@angular/core"
import { Book, BookToJSON } from "@src/app/model/Book"
import { AvgReader, Language, readerModes, User, UserToJSON } from "@src/app/model/User"
import { Service } from '@src/app/services/AbstractService/abstract.service'
import { HttpClient } from "@angular/common/http"
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
}


@Injectable({ providedIn: 'root' })
export class StubLoginService extends Service<User> {
    private localStorageKey = 'signedUser'

    // TODO: inicialización temporal hasta que se implemente el flujo de autenticación
    private signedUser?: User

    constructor(protected override httpClient: HttpClient) {
        super(httpClient)
        const storedUser = localStorage.getItem(this.localStorageKey)
        if (storedUser) {
            const userData = JSON.parse(storedUser)
            this.signedUser = new User(
                userData.id,
                userData.lastName,
                userData.firstName,
                userData.username,
                new Date(userData.birthday),
                userData.email,
                userData.nativeLanguage,
                userData.friends,
                userData.readBooks,
                userData.readToBooks,
                userData.readTimeMinAvg,
                new AvgReader(),
                userData.searchCriteria,
                userData.avatar
            )
        }
    }

    login(credentials: { email: string, password: string }) {
        const userData: User & { password: string } = dummyUserPayloads.find(data => data.email === credentials.email) as unknown as User & { password: string }
        
        if( ! userData || userData.password !== credentials.password ) {
            return { ok: false, res: "Credenciales inválidas."}
        }

        this.signedUser = new User(
            userData.id,
            userData.lastName,
            userData.firstName,
            userData.username,
            userData.birthday,
            userData.email,
            userData.nativeLanguage,
            userData.friends,
            userData.readBooks,
            userData.readToBooks,
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
            this.signedUser?.id ?? 0,
            this.signedUser?.lastName ?? '',
            this.signedUser?.firstName ?? '',
            this.signedUser?.username ?? '',
            this.signedUser?.birthday ?? new Date(),
            this.signedUser?.email ?? '',
            this.signedUser?.nativeLanguage ?? Language.SPANISH,
            this.signedUser?.friends?? [],
            this.signedUser?.readBooks??[],
            this.signedUser?.readToBooks??[],
            this.signedUser?.readTimeMinAvg ?? 0,
            this.signedUser?.readMode,
            this.signedUser?.searchCriteria,
            this.signedUser?.avatar,
        )
    }

    // updateSignedUserData( newUserData: User ) {
    //     this.signedUser = new User(
    //         newUserData?.id ?? 0,
    //         newUserData?.lastName ?? '',
    //         newUserData?.firstName ?? '',
    //         newUserData?.username ?? '',
    //         newUserData?.birthday ?? new Date(),
    //         newUserData?.email ?? '',
    //         newUserData?.nativeLanguage ?? Language.SPANISH,
    //         newUserData?.friends??[],
    //         newUserData?.readBooks??[],
    //         newUserData?.readToBooks??[],
    //         newUserData?.readTimeMinAvg ?? 0,
    //         newUserData?.readMode,
    //         newUserData?.searchCriteria,
    //         newUserData?.avatar,
            
    //     )
    // }

    getUsers(): User[] {
        // Primero crea todos los usuarios
        const users = dummyUserPayloads.map(data => new User(
            data.id,
            data.lastName,
            data.firstName,
            data.username,
            data.birthday,
            data.email,
            Language.SPANISH,
            [], // Amigos se asignarán después
            data.readBooks,
            data.readToBooks,
            data.readTimeAvg,
            data.readerMode,
            data.searchCriterial,
            data.avatar
        ))
    
        // Crea un mapa para acceder rápidamente a los usuarios por username
        const userMap = new Map(users.map(user => [user.username, user]))
    
        // Ahora asigna los amigos
        users.forEach(user => {
            const userData = dummyUserPayloads.find(data => data.username === user.username)
            if (userData?.friends) {
                user.friends = userData.friends
                    .map(friendData => userMap.get(friendData!.username) || new User(
                        0,'', '', '', new Date(), '', Language.SPANISH, [],[],[], 0, readerModes.avgReader, []
                    ))
            }
        })
    
        return users
    }

    searchUsers( searchWord: string ): Promise<User[]> {
        const dummyUsers = dummyUserPayloads
    
        const users = dummyUsers.map(data => new User(
            data.id,
            data.lastName,
            data.firstName,
            data.username,
            data.birthday,
            data.email,
            Language.SPANISH,
            [], // Amigos se asignarán después
            data.readBooks,
            data.readToBooks,
            data.readTimeAvg,
            data.readerMode,
            data.searchCriterial,
            data.avatar
        ))


        return new Promise( (res) => res(users.filter(
            user => ( user.firstName + user.lastName + user.username + user.email ).toLowerCase().includes( searchWord.toLowerCase() )
        )))
    }

    loadUser( user: User ): Promise<void> {
        
        return new Promise( () => {
            console.log(`cargué al usuario: ${user.displayName}` )
        })
    }

    async editUser( user: User ) {
        const url = 'http://localhost:9000/users/editprofile'
        
        const recoms$ = this.httpClient.put<User>(url, user.editProfileJSON())
        const res = await lastValueFrom(recoms$)
        return res
    }

    getAllBooks(): Book[] {
        return [
            {id: 0, title: "El libro de Bill", imageURL:"assets/Book.jpg", autor:"Alex Hirsch", pages:224, words:15000, date:new Date(2024,8,1), lenguages:"Español-English", sales:50300},
            {id: 0, title: "Gaturro Gigante", imageURL:"https://images.cdn2.buscalibre.com/fit-in/360x360/cd/12/cd120253f636098c134b6b21e2d9a3a3.jpg", autor:"Nik", pages:300, words:2200, date:new Date(2024,8,8), lenguages:"Español", sales:70000},
            {id: 0, title: "Llamada de Cthulhu", imageURL:"https://data.livriz.com/media/MediaSpace/F9AFB48D-741D-4834-B760-F59344EEFF34/4/3b6448a7-76ec-4173-a173-9f04ff004233/9789878354521.jpg", autor:"H.P. Lovecraft", pages:360, words:60000, date:new Date(1928,2,2), lenguages:"Español-English-Français", sales:1000000},
            {id: 0, title: "Dragon Ball", imageURL: "https://acdn.mitiendanube.com/stores/001/455/161/products/dragon-ball-saga-freezer-05-ivrea-manga-viducomics-akira-toriyama-toyotaro-z-gt-super-49e3b537e0176388f517111400543922-480-0.jpg", autor: "Akira Toriyama", pages: 360, words: 6000, date: new Date(1984, 3, 10), lenguages: "Español-English-Japonés", sales: 850000 },
            {id: 0, title: "Historia del arte", imageURL: "https://m.media-amazon.com/images/I/81sawrUEiYL._AC_UF894,1000_QL80_.jpg", autor: "Ernst Gombrich", pages: 700, words: 78000, date: new Date(1950, 1, 1), lenguages: "Español-English", sales: 597400 } 
        ]
    }

}








// TODO: provisorio hasta que tengamos un servicio externo
const dummyUserPayloads = [
    {
        id:1,
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
        readBooks: [
            {id: 0, title: "El libro de Bill", imageURL:"assets/Book.jpg", autor:"Alex Hirsch", pages:224, words:15000, date:new Date(2024,8,1), lenguages:"Español-English", sales:50300},
            {id: 0, title: "Dragon Ball", imageURL: "https://acdn.mitiendanube.com/stores/001/455/161/products/dragon-ball-saga-freezer-05-ivrea-manga-viducomics-akira-toriyama-toyotaro-z-gt-super-49e3b537e0176388f517111400543922-480-0.jpg", autor: "Akira Toriyama", pages: 360, words: 6000, date: new Date(1984, 3, 10), lenguages: "Español-English-Japonés", sales: 850000 },
            {id: 0, title: "Historia del arte", imageURL: "https://m.media-amazon.com/images/I/81sawrUEiYL._AC_UF894,1000_QL80_.jpg", autor: "Ernst Gombrich", pages: 700, words: 78000, date: new Date(1950, 1, 1), lenguages: "Español-English", sales: 597400 }
        
        ],
        readToBooks: [
            {id: 0, title: "Gaturro Gigante", imageURL:"https://images.cdn2.buscalibre.com/fit-in/360x360/cd/12/cd120253f636098c134b6b21e2d9a3a3.jpg", autor:"Nik", pages:300, words:2200, date:new Date(2024,8,8), lenguages:"Español", sales:70000},
            {id: 0, title: "Llamada de Cthulhu", imageURL:"https://data.livriz.com/media/MediaSpace/F9AFB48D-741D-4834-B760-F59344EEFF34/4/3b6448a7-76ec-4173-a173-9f04ff004233/9789878354521.jpg", autor:"H.P. Lovecraft", pages:360, words:60000, date:new Date(1928,2,2), lenguages:"Español-English-Français", sales:1000000},           

        ],

        readTimeAvg: 100, 
        readerMode : readerModes.avgReader, 
        searchCriterial : [] , 
        avatar: 'assets/avatar.jpeg',
    },
    {
        id:2,
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
        readBooks:[
            {id: 0, title: "El libro de Bill", imageURL:"assets/Book.jpg", autor:"Alex Hirsch", pages:224, words:15000, date:new Date(2024,8,1), lenguages:"Español-English", sales:50300},
            {id: 0, title: "Gaturro Gigante", imageURL:"https://images.cdn2.buscalibre.com/fit-in/360x360/cd/12/cd120253f636098c134b6b21e2d9a3a3.jpg", autor:"Nik", pages:300, words:2200, date:new Date(2024,8,8), lenguages:"Español", sales:70000},
            {id: 0, title: "Llamada de Cthulhu", imageURL:"https://data.livriz.com/media/MediaSpace/F9AFB48D-741D-4834-B760-F59344EEFF34/4/3b6448a7-76ec-4173-a173-9f04ff004233/9789878354521.jpg", autor:"H.P. Lovecraft", pages:360, words:60000, date:new Date(1928,2,2), lenguages:"Español-English-Français", sales:1000000},           
        ],
        readToBooks: [
            {id: 0, title: "Dragon Ball", imageURL: "https://acdn.mitiendanube.com/stores/001/455/161/products/dragon-ball-saga-freezer-05-ivrea-manga-viducomics-akira-toriyama-toyotaro-z-gt-super-49e3b537e0176388f517111400543922-480-0.jpg", autor: "Akira Toriyama", pages: 360, words: 6000, date: new Date(1984, 3, 10), lenguages: "Español-English-Japonés", sales: 850000 },
            {id: 0, title: "Historia del arte", imageURL: "https://m.media-amazon.com/images/I/81sawrUEiYL._AC_UF894,1000_QL80_.jpg", autor: "Ernst Gombrich", pages: 700, words: 78000, date: new Date(1950, 1, 1), lenguages: "Español-English", sales: 597400 } 
        ],

        readTimeAvg: 110,
        readerMode : readerModes.avgReader, 
        searchCriterial : [] , 
        avatar: 'assets/marge.jpg',
        
    },
    {
        id:3,
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
        readBooks:[
            {id: 0, title: "Llamada de Cthulhu", imageURL:"https://data.livriz.com/media/MediaSpace/F9AFB48D-741D-4834-B760-F59344EEFF34/4/3b6448a7-76ec-4173-a173-9f04ff004233/9789878354521.jpg", autor:"H.P. Lovecraft", pages:360, words:60000, date:new Date(1928,2,2), lenguages:"Español-English-Français", sales:1000000},
            {id: 0, title: "Dragon Ball", imageURL: "https://acdn.mitiendanube.com/stores/001/455/161/products/dragon-ball-saga-freezer-05-ivrea-manga-viducomics-akira-toriyama-toyotaro-z-gt-super-49e3b537e0176388f517111400543922-480-0.jpg", autor: "Akira Toriyama", pages: 360, words: 6000, date: new Date(1984, 3, 10), lenguages: "Español-English-Japonés", sales: 850000 },
            {id: 0, title: "Historia del arte", imageURL: "https://m.media-amazon.com/images/I/81sawrUEiYL._AC_UF894,1000_QL80_.jpg", autor: "Ernst Gombrich", pages: 700, words: 78000, date: new Date(1950, 1, 1), lenguages: "Español-English", sales: 597400 }
        
        ],
        readToBooks: [
            {id: 0, title: "El libro de Bill", imageURL:"assets/Book.jpg", autor:"Alex Hirsch", pages:224, words:15000, date:new Date(2024,8,1), lenguages:"Español-English", sales:50300},
            {id: 0, title: "Gaturro Gigante", imageURL:"https://images.cdn2.buscalibre.com/fit-in/360x360/cd/12/cd120253f636098c134b6b21e2d9a3a3.jpg", autor:"Nik", pages:300, words:2200, date:new Date(2024,8,8), lenguages:"Español", sales:70000},
        ],
        readTimeAvg: 80,
        readerMode : readerModes.avgReader, 
        searchCriterial : [] , 
        avatar: 'assets/bart.jpg',
        
    },
    {
        id:4,
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
        readBooks:[
            {id: 0, title: "El libro de Bill", imageURL:"assets/Book.jpg", autor:"Alex Hirsch", pages:224, words:15000, date:new Date(2024,8,1), lenguages:"Español-English", sales:50300},
            {id: 0, title: "Gaturro Gigante", imageURL:"https://images.cdn2.buscalibre.com/fit-in/360x360/cd/12/cd120253f636098c134b6b21e2d9a3a3.jpg", autor:"Nik", pages:300, words:2200, date:new Date(2024,8,8), lenguages:"Español", sales:70000},
            {id: 0, title: "Llamada de Cthulhu", imageURL:"https://data.livriz.com/media/MediaSpace/F9AFB48D-741D-4834-B760-F59344EEFF34/4/3b6448a7-76ec-4173-a173-9f04ff004233/9789878354521.jpg", autor:"H.P. Lovecraft", pages:360, words:60000, date:new Date(1928,2,2), lenguages:"Español-English-Français", sales:1000000},
            {id: 0, title: "Historia del arte", imageURL: "https://m.media-amazon.com/images/I/81sawrUEiYL._AC_UF894,1000_QL80_.jpg", autor: "Ernst Gombrich", pages: 700, words: 78000, date: new Date(1950, 1, 1), lenguages: "Español-English", sales: 597400 }
        
        ],
        readToBooks: [
            {id: 0, title: "Dragon Ball", imageURL: "https://acdn.mitiendanube.com/stores/001/455/161/products/dragon-ball-saga-freezer-05-ivrea-manga-viducomics-akira-toriyama-toyotaro-z-gt-super-49e3b537e0176388f517111400543922-480-0.jpg", autor: "Akira Toriyama", pages: 360, words: 6000, date: new Date(1984, 3, 10), lenguages: "Español-English-Japonés", sales: 850000 },
       ],
        readTimeAvg: 150,
        readerMode : readerModes.avgReader, 
        searchCriterial : [] , 
        avatar: 'assets/lisa.jpeg',
    },
    {
        id:5,
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
        readBooks:[
            {id: 0, title: "El libro de Bill", imageURL:"assets/Book.jpg", autor:"Alex Hirsch", pages:224, words:15000, date:new Date(2024,8,1), lenguages:"Español-English", sales:50300},
            {id: 0, title: "Llamada de Cthulhu", imageURL:"https://data.livriz.com/media/MediaSpace/F9AFB48D-741D-4834-B760-F59344EEFF34/4/3b6448a7-76ec-4173-a173-9f04ff004233/9789878354521.jpg", autor:"H.P. Lovecraft", pages:360, words:60000, date:new Date(1928,2,2), lenguages:"Español-English-Français", sales:1000000},
            {id: 0, title: "Dragon Ball", imageURL: "https://acdn.mitiendanube.com/stores/001/455/161/products/dragon-ball-saga-freezer-05-ivrea-manga-viducomics-akira-toriyama-toyotaro-z-gt-super-49e3b537e0176388f517111400543922-480-0.jpg", autor: "Akira Toriyama", pages: 360, words: 6000, date: new Date(1984, 3, 10), lenguages: "Español-English-Japonés", sales: 850000 },            
        ],
        readToBooks: [
            {id: 0, title: "Gaturro Gigante", imageURL:"https://images.cdn2.buscalibre.com/fit-in/360x360/cd/12/cd120253f636098c134b6b21e2d9a3a3.jpg", autor:"Nik", pages:300, words:2200, date:new Date(2024,8,8), lenguages:"Español", sales:70000},
            {id: 0, title: "Historia del arte", imageURL: "https://m.media-amazon.com/images/I/81sawrUEiYL._AC_UF894,1000_QL80_.jpg", autor: "Ernst Gombrich", pages: 700, words: 78000, date: new Date(1950, 1, 1), lenguages: "Español-English", sales: 597400 } 
        ],
        readTimeAvg: 120,
        readerMode : readerModes.avgReader, 
        searchCriterial : [], 
        avatar: 'assets/milhouse.jpg',
        
    },
    {
        id:6,
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
        readBooks:[
            {id: 0, title: "El libro de Bill", imageURL:"assets/Book.jpg", autor:"Alex Hirsch", pages:224, words:15000, date:new Date(2024,8,1), lenguages:"Español-English", sales:50300},
            {id: 0, title: "Llamada de Cthulhu", imageURL:"https://data.livriz.com/media/MediaSpace/F9AFB48D-741D-4834-B760-F59344EEFF34/4/3b6448a7-76ec-4173-a173-9f04ff004233/9789878354521.jpg", autor:"H.P. Lovecraft", pages:360, words:60000, date:new Date(1928,2,2), lenguages:"Español-English-Français", sales:1000000},
            {id: 0, title: "Historia del arte", imageURL: "https://m.media-amazon.com/images/I/81sawrUEiYL._AC_UF894,1000_QL80_.jpg", autor: "Ernst Gombrich", pages: 700, words: 78000, date: new Date(1950, 1, 1), lenguages: "Español-English", sales: 597400 }
        
        ],
        readToBooks: [
            {id: 0, title: "Gaturro Gigante", imageURL:"https://images.cdn2.buscalibre.com/fit-in/360x360/cd/12/cd120253f636098c134b6b21e2d9a3a3.jpg", autor:"Nik", pages:300, words:2200, date:new Date(2024,8,8), lenguages:"Español", sales:70000},
            {id: 0, title: "Dragon Ball", imageURL: "https://acdn.mitiendanube.com/stores/001/455/161/products/dragon-ball-saga-freezer-05-ivrea-manga-viducomics-akira-toriyama-toyotaro-z-gt-super-49e3b537e0176388f517111400543922-480-0.jpg", autor: "Akira Toriyama", pages: 360, words: 6000, date: new Date(1984, 3, 10), lenguages: "Español-English-Japonés", sales: 850000 },
        ],
        readTimeAvg: 90,
        readerMode : readerModes.avgReader, 
        searchCriterial : [], 
        avatar: 'assets/barney.jpg',
        
    },
    {
        id:7,
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
        readBooks:[
            {id: 0, title: "El libro de Bill", imageURL:"assets/Book.jpg", autor:"Alex Hirsch", pages:224, words:15000, date:new Date(2024,8,1), lenguages:"Español-English", sales:50300},
            {id: 0, title: "Gaturro Gigante", imageURL:"https://images.cdn2.buscalibre.com/fit-in/360x360/cd/12/cd120253f636098c134b6b21e2d9a3a3.jpg", autor:"Nik", pages:300, words:2200, date:new Date(2024,8,8), lenguages:"Español", sales:70000},
        ],
        readToBooks: [
            {id: 0, title: "El libro de Bill", imageURL:"assets/Book.jpg", autor:"Alex Hirsch", pages:224, words:15000, date:new Date(2024,8,1), lenguages:"Español-English", sales:50300},
            {id: 0, title: "Gaturro Gigante", imageURL:"https://images.cdn2.buscalibre.com/fit-in/360x360/cd/12/cd120253f636098c134b6b21e2d9a3a3.jpg", autor:"Nik", pages:300, words:2200, date:new Date(2024,8,8), lenguages:"Español", sales:70000},
        ],
        readTimeAvg: 100,
        readerMode : readerModes.avgReader, 
        searchCriterial : [], 
        avatar: 'assets/selma.png',
        
    },
    {
        id:8,
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
        readBooks:[
            {id: 0, title: "Gaturro Gigante", imageURL:"https://images.cdn2.buscalibre.com/fit-in/360x360/cd/12/cd120253f636098c134b6b21e2d9a3a3.jpg", autor:"Nik", pages:300, words:2200, date:new Date(2024,8,8), lenguages:"Español", sales:70000},
            {id: 0, title: "Llamada de Cthulhu", imageURL:"https://data.livriz.com/media/MediaSpace/F9AFB48D-741D-4834-B760-F59344EEFF34/4/3b6448a7-76ec-4173-a173-9f04ff004233/9789878354521.jpg", autor:"H.P. Lovecraft", pages:360, words:60000, date:new Date(1928,2,2), lenguages:"Español-English-Français", sales:1000000},
            {id: 0, title: "Dragon Ball", imageURL: "https://acdn.mitiendanube.com/stores/001/455/161/products/dragon-ball-saga-freezer-05-ivrea-manga-viducomics-akira-toriyama-toyotaro-z-gt-super-49e3b537e0176388f517111400543922-480-0.jpg", autor: "Akira Toriyama", pages: 360, words: 6000, date: new Date(1984, 3, 10), lenguages: "Español-English-Japonés", sales: 850000 },            
        ],
        readToBooks: [
            {id: 0, title: "El libro de Bill", imageURL:"assets/Book.jpg", autor:"Alex Hirsch", pages:224, words:15000, date:new Date(2024,8,1), lenguages:"Español-English", sales:50300},
            {id: 0, title: "Historia del arte", imageURL: "https://m.media-amazon.com/images/I/81sawrUEiYL._AC_UF894,1000_QL80_.jpg", autor: "Ernst Gombrich", pages: 700, words: 78000, date: new Date(1950, 1, 1), lenguages: "Español-English", sales: 597400 } 
        ],
        readTimeAvg: 110,
        readerMode : readerModes.avgReader, 
        searchCriterial : [], 
        avatar: 'assets/patty.png',
    },
    {
        id:9,
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
        readBooks:[
            {id: 0, title: "El libro de Bill", imageURL:"assets/Book.jpg", autor:"Alex Hirsch", pages:224, words:15000, date:new Date(2024,8,1), lenguages:"Español-English", sales:50300},
            {id: 0, title: "Dragon Ball", imageURL: "https://acdn.mitiendanube.com/stores/001/455/161/products/dragon-ball-saga-freezer-05-ivrea-manga-viducomics-akira-toriyama-toyotaro-z-gt-super-49e3b537e0176388f517111400543922-480-0.jpg", autor: "Akira Toriyama", pages: 360, words: 6000, date: new Date(1984, 3, 10), lenguages: "Español-English-Japonés", sales: 850000 },
            {id: 0, title: "Historia del arte", imageURL: "https://m.media-amazon.com/images/I/81sawrUEiYL._AC_UF894,1000_QL80_.jpg", autor: "Ernst Gombrich", pages: 700, words: 78000, date: new Date(1950, 1, 1), lenguages: "Español-English", sales: 597400 }
        ],
        readToBooks: [
            {id: 0, title: "Gaturro Gigante", imageURL:"https://images.cdn2.buscalibre.com/fit-in/360x360/cd/12/cd120253f636098c134b6b21e2d9a3a3.jpg", autor:"Nik", pages:300, words:2200, date:new Date(2024,8,8), lenguages:"Español", sales:70000},
            {id: 0, title: "Llamada de Cthulhu", imageURL:"https://data.livriz.com/media/MediaSpace/F9AFB48D-741D-4834-B760-F59344EEFF34/4/3b6448a7-76ec-4173-a173-9f04ff004233/9789878354521.jpg", autor:"H.P. Lovecraft", pages:360, words:60000, date:new Date(1928,2,2), lenguages:"Español-English-Français", sales:1000000},
        ],
        readTimeAvg: 80,
        readerMode : readerModes.avgReader, 
        searchCriterial : [], 
        avatar: 'assets/nelson.jpg',
    },
    {
        id:10,
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
        readBooks:[
            {id: 0, title: "Gaturro Gigante", imageURL:"https://images.cdn2.buscalibre.com/fit-in/360x360/cd/12/cd120253f636098c134b6b21e2d9a3a3.jpg", autor:"Nik", pages:300, words:2200, date:new Date(2024,8,8), lenguages:"Español", sales:70000},
            {id: 0, title: "Dragon Ball", imageURL: "https://acdn.mitiendanube.com/stores/001/455/161/products/dragon-ball-saga-freezer-05-ivrea-manga-viducomics-akira-toriyama-toyotaro-z-gt-super-49e3b537e0176388f517111400543922-480-0.jpg", autor: "Akira Toriyama", pages: 360, words: 6000, date: new Date(1984, 3, 10), lenguages: "Español-English-Japonés", sales: 850000 },  
        ],
        readToBooks: [
            {id: 0, title: "El libro de Bill", imageURL:"assets/Book.jpg", autor:"Alex Hirsch", pages:224, words:15000, date:new Date(2024,8,1), lenguages:"Español-English", sales:50300},
            {id: 0, title: "Llamada de Cthulhu", imageURL:"https://data.livriz.com/media/MediaSpace/F9AFB48D-741D-4834-B760-F59344EEFF34/4/3b6448a7-76ec-4173-a173-9f04ff004233/9789878354521.jpg", autor:"H.P. Lovecraft", pages:360, words:60000, date:new Date(1928,2,2), lenguages:"Español-English-Français", sales:1000000},
            {id: 0, title: "Historia del arte", imageURL: "https://m.media-amazon.com/images/I/81sawrUEiYL._AC_UF894,1000_QL80_.jpg", autor: "Ernst Gombrich", pages: 700, words: 78000, date: new Date(1950, 1, 1), lenguages: "Español-English", sales: 597400 } 
        ],
        readTimeAvg: 130,
        readerMode : readerModes.anxiousReader, 
        searchCriterial : [], 
        avatar: 'assets/carl.jpg',
    }      
] 