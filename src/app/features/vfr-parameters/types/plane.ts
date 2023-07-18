export interface PlaneType {
  id: number,
  name: string,
  fuelConsumption: PlaneFuel
}
export type PlaneTypeForSelect = Omit<PlaneType, "fuelConsumption">;


type PlaneFuel = {
  cruise:number
  takeoff:number
}
