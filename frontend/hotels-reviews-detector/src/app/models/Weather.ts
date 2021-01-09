interface Location {
  city: string;
  country: string;
}
export interface Weather {
  temp: number;
  location: Location;
  desc: string;
}
