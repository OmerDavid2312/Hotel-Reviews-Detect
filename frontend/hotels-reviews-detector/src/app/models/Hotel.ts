interface Review{
    title:String,
    rating:Number,
    desc:String,
    user:String,
}
export interface Hotel{
    name:String,
    address:String,
    image:String,
    rating:Number,
    class:Number,
    about:String,
    reviewCount:String,
    city:String,
    country:String,
    reviews:Review[]
}