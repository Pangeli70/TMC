import  {IApgTmcPartySeatBooking} from "./IApgTmcPartySeatBooking.ts";

export interface IApgTmcParty {

    name:string;
    date: Date;
    locationID: string;
    gameID: string;
    bookings: IApgTmcPartySeatBooking[];

}