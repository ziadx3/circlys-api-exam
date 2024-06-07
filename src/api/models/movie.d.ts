import { Timeslot } from "./timeslot";


export interface Movie {

    _id: string;

    name: string;

    description: string;

    timeSlots : Timeslot[] | undefined

}