import {Waypoint} from "../model/waypoint";
import {hoursToMinutes} from 'date-fns'

export function removeElementFromList<T>(list: T[], elementToRemove: T) {
  list.forEach((item, index) => {
    if (item === elementToRemove) list?.splice(index, 1);
  });
}

export function accumulateDistance<T extends Waypoint, U>(list: T[]): U | null {
  return list.reduce(
    (previousValue, currentValue) => {
      console.log(previousValue)
      previousValue.distanceToNextPoint = previousValue.getLatLng().distanceTo(currentValue.getLatLng()) / 1000;
      currentValue.distanceToNextPoint = undefined
      return currentValue;
    }
  ), null;
}

export function calculateTotalDistance<T extends Waypoint, U extends keyof Waypoint>(list: Waypoint[], key: U): number {
  return list.reduce<number>((accumulator, obj) => {
    if (obj[key] && typeof obj[key] == 'number') { // @ts-ignore
      return accumulator + obj[key];
    }
    return accumulator.toFixed(0);
  }, 0);
}


export function calculateBearing<T extends Waypoint, U>(list: T[]): U | null {
  return list.reduce(
    (previousValue, currentValue) => {
      let pi = Math.PI;
      let d2r = pi / 180;
      let r2d = 180 / pi;
      let lat1 = previousValue.getLatLng().lat * d2r;
      let lat2 = currentValue.getLatLng().lat * d2r;
      let dLon = (currentValue.getLatLng().lng - previousValue.getLatLng().lng) * d2r;
      let y = Math.sin(dLon) * Math.cos(lat2);
      let x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
      let brng = Math.atan2(y, x);
      brng = brng * r2d;
      brng = (brng + 360) % 360;
      previousValue.bearing = brng;
      return currentValue;
    }
  ), null;
}

export function addNameToPoints<T extends Waypoint>(list: T[]) {
  list.forEach((item, index) => {
    item.nameOfPoint = String.fromCharCode(index + 65)
    item.bindTooltip("Waypoint " + item.nameOfPoint, //specific number,
      {
        permanent: false,
        direction: 'left',
        className: "my-labels"
      });
  });
}

export function calculateTimeBetweenWaypoints<T extends Waypoint, U>(list: T[], velocity: number): void {
  list.forEach(waypoint => {
    if (waypoint.distanceToNextPoint !== undefined) {
      waypoint.timeToNextPoint =
        hoursToMinutes(waypoint.distanceToNextPoint / velocity)
    }
  })
}
