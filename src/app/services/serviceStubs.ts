import { Observable, of } from "rxjs"
import { AvgReader, readerModes, SearchCriteria, User } from "../model/User"
//import { Recommendation } from "../model/Recommendation"
import { RecomEdit } from "../model/RecomEdit"


export const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'post'])


httpClientSpy.get.withArgs('http://localhost:9000/recommendations').and.returnValue(of([
    {
        creator: {
            id: 16,
            fullName: "Ralph Wiggum"
        },
        title: "Una aventura que recordarás",
        description: "Una aventura inolvidable que todos deben leer.",
        publicIs: true,
        id: 1,
        ratings: [],
        canRating: false,
        canEdit: false,
        books: [
            {
                title: "La señora Dalloway",
                autor: "Woolf Virginia",
                imageURL: "https://cdn.prod.website-files.com/6034d7d1f3e0f52c50b2adee/6321fc34dc1e29d4c45591e8_9788418395819.jpeg",
                date: "3869-02-01T03:00:00.000+00:00",
                sales: 420,
                pages: 304,
                words: 75000,
                id: 39,
                lenguages: " ENGLISH SPANISH"
            },
            {
                title: "Guerra y Paz",
                autor: "Tolstoy Leo",
                imageURL: "https://images.cdn3.buscalibre.com/fit-in/520x520/e3/43/e343d2348ac304737b244a8a4def0aa0.jpg",
                date: "3869-02-01T03:00:00.000+00:00",
                sales: 900,
                pages: 1225,
                words: 560000,
                id: 53,
                lenguages: " RUSSIAN ENGLISH FRENCH"
            }
        ]
    },
    {
        creator: {
            id: 16,
            fullName: "Ralph Wiggum"
        },
        title: "Risas garantizadas",
        description: "Un libro que me hizo reír a carcajadas.",
        publicIs: true,
        id: 2,
        ratings: [
            {
                rating: 4,
                description: "Recomendado.",
                creatorId: 12,
                creatorFullName: "Lenny Leonard",
                createDate: "2024-10-21",
                avatar: "https://lossimpson.es/wp-content/uploads/2023/11/Lenny-Leonard-%E2%80%93-Los-Simpson.png"
            }
        ],
        canRating: false,
        canEdit: false,
        books: [
            {
                title: "Sin blanca en París y Londres",
                autor: "Orwell George",
                imageURL: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh_od7QJ1IAeBkmggk2bU9pcW3lWFj1g0-44Zr_YijTc5A0ARIiCRvsSA01OjHYW07f8sp_dSlvq9Ot02xB_dq-41tUWzLsfGavNhw8cZTlbseWmxlB7GPuPJ7HtOHbSmvvqNh22QoFROk/s1600/down+and+out.jpg",
                date: "3869-02-01T03:00:00.000+00:00",
                sales: 250,
                pages: 232,
                words: 60000,
                id: 28,
                lenguages: " ENGLISH ITALIAN"
            },
            {
                title: "La señora Dalloway",
                autor: "Woolf Virginia",
                imageURL: "https://cdn.prod.website-files.com/6034d7d1f3e0f52c50b2adee/6321fc34dc1e29d4c45591e8_9788418395819.jpeg",
                date: "3869-02-01T03:00:00.000+00:00",
                sales: 420,
                pages: 304,
                words: 75000,
                id: 39,
                lenguages: " ENGLISH SPANISH"
            }
        ]
    }
]))

// export const recommensationServiceStub = jasmine.createSpyObj('RecommendationService', ['fetchRecoms'], {
//     changeSignedUserSubject: {
//         asObservable: (() => { return new Observable<Recommendation[]>() })
//     }
// })

// recommensationServiceStub.fetchRecoms.and.returnValue([
//     {
//         creator: {
//             id: 16,
//             fullName: "Ralph Wiggum"
//         },
//         title: "Una aventura que recordarás",
//         description: "Una aventura inolvidable que todos deben leer.",
//         publicIs: true,
//         id: 1,
//         ratings: [],
//         canRating: false,
//         canEdit: false,
//         books: [
//             {
//                 title: "La señora Dalloway",
//                 autor: "Woolf Virginia",
//                 imageURL: "https://cdn.prod.website-files.com/6034d7d1f3e0f52c50b2adee/6321fc34dc1e29d4c45591e8_9788418395819.jpeg",
//                 date: "3869-02-01T03:00:00.000+00:00",
//                 sales: 420,
//                 pages: 304,
//                 words: 75000,
//                 id: 39,
//                 lenguages: " ENGLISH SPANISH"
//             },
//             {
//                 title: "Guerra y Paz",
//                 autor: "Tolstoy Leo",
//                 imageURL: "https://images.cdn3.buscalibre.com/fit-in/520x520/e3/43/e343d2348ac304737b244a8a4def0aa0.jpg",
//                 date: "3869-02-01T03:00:00.000+00:00",
//                 sales: 900,
//                 pages: 1225,
//                 words: 560000,
//                 id: 53,
//                 lenguages: " RUSSIAN ENGLISH FRENCH"
//             }
//         ]
//     },
//     {
//         creator: {
//             id: 16,
//             fullName: "Ralph Wiggum"
//         },
//         title: "Risas garantizadas",
//         description: "Un libro que me hizo reír a carcajadas.",
//         publicIs: true,
//         id: 2,
//         ratings: [
//             {
//                 rating: 4,
//                 description: "Recomendado.",
//                 creatorId: 12,
//                 creatorFullName: "Lenny Leonard",
//                 createDate: "2024-10-21",
//                 avatar: "https://lossimpson.es/wp-content/uploads/2023/11/Lenny-Leonard-%E2%80%93-Los-Simpson.png"
//             }
//         ],
//         canRating: false,
//         canEdit: false,
//         books: [
//             {
//                 title: "Sin blanca en París y Londres",
//                 autor: "Orwell George",
//                 imageURL: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh_od7QJ1IAeBkmggk2bU9pcW3lWFj1g0-44Zr_YijTc5A0ARIiCRvsSA01OjHYW07f8sp_dSlvq9Ot02xB_dq-41tUWzLsfGavNhw8cZTlbseWmxlB7GPuPJ7HtOHbSmvvqNh22QoFROk/s1600/down+and+out.jpg",
//                 date: "3869-02-01T03:00:00.000+00:00",
//                 sales: 250,
//                 pages: 232,
//                 words: 60000,
//                 id: 28,
//                 lenguages: " ENGLISH ITALIAN"
//             },
//             {
//                 title: "La señora Dalloway",
//                 autor: "Woolf Virginia",
//                 imageURL: "https://cdn.prod.website-files.com/6034d7d1f3e0f52c50b2adee/6321fc34dc1e29d4c45591e8_9788418395819.jpeg",
//                 date: "3869-02-01T03:00:00.000+00:00",
//                 sales: 420,
//                 pages: 304,
//                 words: 75000,
//                 id: 39,
//                 lenguages: " ENGLISH SPANISH"
//             }
//         ]
//     }
// ])

httpClientSpy.post.withArgs('http://localhost:9000/auth/login').and.returnValue(of({
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
},))


export const loginServiceStub = jasmine.createSpyObj('LoginService', ['getSignedUser'], {
    changeSignedUserSubject: {
        asObservable: (() => { return new Observable<User>() })
    }
})

loginServiceStub.getSignedUser.and.returnValue({
    id:1,
    lastName: "Simpson",
    firstName: "Homero",
    username: "hsimpson", 
    password: "mandarina",
    birthday: new Date(1968, 4, 4), 
    email: 'homer@simps.com',
    readMode: new AvgReader(), 
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
    searchCriteria: SearchCriteria.GreatReader, 
    avatar: 'assets/avatar.jpeg',
})

httpClientSpy.get.withArgs('http://localhost:9000/recommendations/1/1').and.returnValue(of(
    {
        creator: {
            id: 16,
            fullName: "Ralph Wiggum"
        },
        title: "Una aventura que recordarás",
        description: "Una aventura inolvidable que todos deben leer.",
        publicIs: true,
        id: 1,
        ratings: [],
        canRating: false,
        canEdit: false,
        books: [
            {
                title: "La señora Dalloway",
                autor: "Woolf Virginia",
                imageURL: "https://cdn.prod.website-files.com/6034d7d1f3e0f52c50b2adee/6321fc34dc1e29d4c45591e8_9788418395819.jpeg",
                date: "3869-02-01T03:00:00.000+00:00",
                sales: 420,
                pages: 304,
                words: 75000,
                id: 39,
                lenguages: " ENGLISH SPANISH"
            },
            {
                title: "Guerra y Paz",
                autor: "Tolstoy Leo",
                imageURL: "https://images.cdn3.buscalibre.com/fit-in/520x520/e3/43/e343d2348ac304737b244a8a4def0aa0.jpg",
                date: "3869-02-01T03:00:00.000+00:00",
                sales: 900,
                pages: 1225,
                words: 560000,
                id: 53,
                lenguages: " RUSSIAN ENGLISH FRENCH"
            }
        ]
    }
))

export const recomServiceStub = jasmine.createSpyObj('RecommendationService', ['getRecomm'], {
    changeSignedUserSubject: {
        asObservable: (() => { return new Observable<RecomEdit>() })
    }
})

recomServiceStub.getRecomm.and.returnValue(
    {
        creator: {
            id: 16,
            fullName: "Ralph Wiggum"
        },
        title: "Una aventura que recordarás",
        description: "Una aventura inolvidable que todos deben leer.",
        publicIs: true,
        id: 1,
        ratings: [],
        canRating: false,
        canEdit: false,
        books: [
            {
                title: "La señora Dalloway",
                autor: "Woolf Virginia",
                imageURL: "https://cdn.prod.website-files.com/6034d7d1f3e0f52c50b2adee/6321fc34dc1e29d4c45591e8_9788418395819.jpeg",
                date: "3869-02-01T03:00:00.000+00:00",
                sales: 420,
                pages: 304,
                words: 75000,
                id: 39,
                lenguages: " ENGLISH SPANISH"
            },
            {
                title: "Guerra y Paz",
                autor: "Tolstoy Leo",
                imageURL: "https://images.cdn3.buscalibre.com/fit-in/520x520/e3/43/e343d2348ac304737b244a8a4def0aa0.jpg",
                date: "3869-02-01T03:00:00.000+00:00",
                sales: 900,
                pages: 1225,
                words: 560000,
                id: 53,
                lenguages: " RUSSIAN ENGLISH FRENCH"
            }
        ]
    })