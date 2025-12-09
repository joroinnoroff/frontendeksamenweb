import type { IFighter } from "./IFighter";
import type { IDefaultResponse } from "./ResponseInterfaces";

// context for app - hva som gis til 
//Samme eksempl som Cakes eksempel
export default interface IFighterContext {
  fighters: IFighter[];
  getFighterQuantity: () => number;
  saveFighter: (fighter: Omit<IFighter, "id" | "image">, imageFile: File)
    => Promise<IDefaultResponse>;
  updateFighterStatus: (fighterId: number, status: boolean) => void;
  deleteFighter: (fighter: IFighter) => Promise<boolean>

}