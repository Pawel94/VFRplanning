import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {Airport} from "../model/modelForMaps"


@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private readonly httpRequest: HttpClient) {
  }

  AIRPORT_LINK = 'https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json'

  findAirPortsFrom(searchCriteria?: string): Observable<Airport[]> {
    return this.httpRequest.get<Airport[]>(this.AIRPORT_LINK).pipe(
      map(element => element.filter(airport => airport.country === "Poland")),
      tap(obj => console.log(obj)))
  }
}
