import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private readonly db: AngularFireDatabase) {
  }


  getCitiesFromDB(): Observable<any> {
    return this.db.list('/city').valueChanges()
  }
}
