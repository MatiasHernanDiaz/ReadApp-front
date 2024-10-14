import { Injectable } from "@angular/core"
import { Book, BookToJSON } from "@src/app/model/Book"
import { Language, readerModes, User, UserToJSON } from "@src/app/model/User"
import { Service } from '@src/app/services/AbstractService/abstract.service'
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

    async editUser( user: User ) {
        const url = pathUser.getEditProfile()
        
        const recoms$ = this.httpClient.put<User>(url, user.editProfileJSON())
        const res = await lastValueFrom(recoms$)
        return res
    }

    // TODO
    // async searchUsers( searchWord: string ) {
        
    // }

    // TODO
    // async loadUser( user: User ) {
        
    // }
}


@Injectable({ providedIn: 'root' })
export class StubLoginService extends Service<User> {
    
    private signedUser?: User


    searchUsers( searchWord: string ): Promise<User[]> {
        const dummyUsers = dummyUserPayloads as unknown as User[]
    
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
            data.readTimeMinAvg,
            data.readMode,
            data.searchCriteria,
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

        readTimeMinAvg: 100, 
        readMode : readerModes.avgReader, 
        searchCriteria : [] , 
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

        readTimeMinAvg: 110,
        readMode : readerModes.avgReader, 
        searchCriteria : [] , 
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
        readTimeMinAvg: 80,
        readMode : readerModes.avgReader, 
        searchCriteria : [] , 
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
        readTimeMinAvg: 150,
        readMode : readerModes.avgReader, 
        searchCriteria : [] , 
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
        readTimeMinAvg: 120,
        readMode : readerModes.avgReader, 
        searchCriteria : [], 
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
        readTimeMinAvg: 90,
        readMode : readerModes.avgReader, 
        searchCriteria : [], 
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
        readTimeMinAvg: 100,
        readMode : readerModes.avgReader, 
        searchCriteria : [], 
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
        readTimeMinAvg: 110,
        readMode : readerModes.avgReader, 
        searchCriteria : [], 
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
        readTimeMinAvg: 80,
        readMode : readerModes.avgReader, 
        searchCriteria : [], 
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
        readTimeMinAvg: 130,
        readMode : readerModes.anxiousReader, 
        searchCriteria : [], 
        avatar: 'assets/carl.jpg',
    }      
] 