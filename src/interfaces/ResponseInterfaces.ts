import type { IFighter } from "./IFighter"

export interface IDefaultResponse<T = any> {
  success: boolean,
  data?: T
}
//Array
export interface IFightersResponse {
  success: boolean,
  data: IFighter[] | null
}
// Enkel 
export interface IFighterResponse {
  success: boolean,
  data: IFighter | null
}