import { User } from "@src/app/model/User"

///TODO: che pasa la clase a mayuscula que el mio no lo pude hacer

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