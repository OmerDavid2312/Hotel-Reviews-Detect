interface Geo{
    lat:Number,
    long:Number
}
export interface City{
    name:String,
    country:String,
    geo:Geo,
    image:String
}