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

  export interface ReadMode {

  }

  export interface SearchCriteria {

  }

  export class ReaderAvg implements ReadMode {

  }