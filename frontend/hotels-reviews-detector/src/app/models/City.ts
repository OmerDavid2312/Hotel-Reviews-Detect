interface Geo {
  lat: number;
  long: number;
}
export interface City {
  name: string;
  country: string;
  geo: Geo;
  image: string;
}
