import { User } from "./User"

export class Rating{
    creator: User
    nRating: number
    description: string
    constructor(
        creator: User,
        nRating: number,
        description: string
    ){
        this.creator = creator
        this.nRating = nRating
        this.description = description
    }
}



export type JSONtoRating = {
    creator: User
    nRating: number
    description: string
}