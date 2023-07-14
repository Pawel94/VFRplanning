

export interface Airport {
  code: string
  lat: number
  lon: number
  name: string
  city: string
  state: string
  country: string
  woeid: string
  tz: string
  phone: string
  type: string
  email: string
  url: string
  runway_length: string
  elev: string
  icao: string
  direct_flights: string
  carriers: string
}

export interface AirportsDTO {
 code:string
  coordinates:{
    latitude:number
    longitude:number
  }
}

