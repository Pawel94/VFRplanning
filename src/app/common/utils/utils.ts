import {Waypoint} from "../../shared/model/waypoint";


export function removeElementFromList<T>(list: T[], elementToRemove: T) {
  list.forEach((item, index) => {
    if (item === elementToRemove) list?.splice(index, 1);
  });
}

export function accumulateDistance<T extends Waypoint, U>(list: T[]): U | null {
  return list.reduce(
    (previousValue, currentValue) => {
      currentValue.distanceToNextPoint = previousValue.getLatLng().distanceTo(currentValue.getLatLng()) / 1000;
      return currentValue;
    }
  ), null;
}
