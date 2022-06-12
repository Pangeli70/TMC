import {IApgTmcGear} from "./IApgTmcGear.ts" 
import {IApgTmcGame} from "./IApgTmcGame.ts" 

export interface IApgTmcUser{
    nickName: string;
    gears: IApgTmcGear[];
    games: IApgTmcGame[]
}