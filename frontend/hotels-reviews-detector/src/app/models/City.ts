interface Geo{
    lat:Number,
    long:Number
}
export interface City{
    name:string,
    country:string,
    geo:Geo,
    image:string
}