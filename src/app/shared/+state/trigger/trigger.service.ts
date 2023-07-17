import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

export interface TriggerEvent{
  state:boolean
}
@Injectable({
  providedIn: 'root'
})
export class TriggerService {
  private mapTrigger$ = new BehaviorSubject<TriggerEvent>({state: true});
  triggered$ = this.mapTrigger$.asObservable()


  sendEvent(triggerEvent: TriggerEvent) {
    this.mapTrigger$.next(triggerEvent);
  }

}
