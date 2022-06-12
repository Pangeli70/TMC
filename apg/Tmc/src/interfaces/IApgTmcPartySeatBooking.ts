import { IApgTmcUser } from "./IApgTmcUser.ts"

export interface IApgTmcPartySeatBooking {

    seatID: string;
    nickName: IApgTmcUser | null;
    date: Date | null;
    donation: number;
}