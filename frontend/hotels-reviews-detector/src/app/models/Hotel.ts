export enum Reliability{
    TRUTH="truth",
    DECEPTIVE="deceptive"
}

export interface Review{
    title:string,
    rating:number,
    desc:string,
    user:string,
    reliability?:Reliability.TRUTH|Reliability.DECEPTIVE
}

export interface ReviewStats{
    fake?:{
        count:number,
        avg:number,
        ratingCount:Object
    },
    truth?:{
        count:number,
        avg:number,
        ratingCount:Object
    },
    all?:{
        count:number,
        avg:number,
        ratingCount:Object
    }
}

export interface Hotel{
    name:string,
    address:String,
    image:string,
    rating:number,
    class:number,
    about:string,
    reviewCount:string,
    city:string,
    country:string,
    reviews:Review[],
    reviewStats?:ReviewStats
}