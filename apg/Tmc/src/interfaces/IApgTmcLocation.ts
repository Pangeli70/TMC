import {IApgTmcLocationSeat} from "./IApgTmcLocationSeat.ts";

export interface IApgTmcLocation {

    ID: string;
    name: string;
    town:string;
    address: string;
    svg: string;
    seats: IApgTmcLocationSeat[];

}