import { User } from "./User"

export class Rating{
    user: User
    nRating: number
    text: string
    constructor(
        user: User,
        nRating: number,
        text: string
    ){
        this.user = user
        this.nRating = nRating
        this.text = text
    }
}



export type JSONtoRating = {
    user: User
    nRating: number
    text: string
}