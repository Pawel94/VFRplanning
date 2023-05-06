export interface PlaneType {
  id: number,
  name: string,
  fuelConsumption: planeFuel
}
export type PlaneTypeForSelect = Omit<PlaneType, "fuelConsumption">;


type planeFuel = {
  cruise:number
  takeoff:number
}
