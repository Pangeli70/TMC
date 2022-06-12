import { eApgTmcGearPlatform } from "../enums/eApgTmcGearPlatform.ts";
import { IApgTmcGearItem } from "./IApgTmcGearItem.ts";

export interface IApgTmcGear {

    name: string;
    platform: eApgTmcGearPlatform;
    items: IApgTmcGearItem[];

}