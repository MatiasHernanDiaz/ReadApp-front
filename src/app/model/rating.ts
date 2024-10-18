// import { User } from "@src/app/model/User"

///TODO: che pasa la clase a mayuscula que el mio no lo pude hacer

// export class Rating{
//     creator: User
//     nRating: number
//     description: string
//     constructor(
//         creator: User,
//         nRating: number,
//         description: string
//     ){
//         this.creator = creator
//         this.nRating = nRating
//         this.description = description
//     }
// }

export type RatingJSON = {
    creatorId: number
    rating: number
    description: string,
    creatorFullName:string,
    createDate: Date,
    avatar: string
}

export class RatingWithId {
    creatorId: number
    rating: number
    description: string
    creatorFullName: string
    createDate: Date
    avatar: string
    constructor(creatorId:number, rating: number, description: string, creatorFullName: string, createDate: Date, avatar: string)
    {
        this.creatorId = creatorId
        this.description = description
        this.rating = rating
        this.creatorFullName = creatorFullName
        this.createDate = new Date(createDate)
        this.avatar = avatar
    }
    
    static fromRatingJSON(ratingJSON: RatingJSON): RatingWithId{
        return new RatingWithId(
            ratingJSON.creatorId,
            ratingJSON.rating,
            ratingJSON.description,
            ratingJSON.creatorFullName,
            ratingJSON.createDate,
            ratingJSON.avatar
        )
    }
}