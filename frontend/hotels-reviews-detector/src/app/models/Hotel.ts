interface Review{
    title:string,
    rating:number,
    desc:string,
    user:string,
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
    reviews:Review[]
}