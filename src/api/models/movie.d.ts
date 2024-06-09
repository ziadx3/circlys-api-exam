import { ObjectId } from "mongodb";
import { Timeslot } from "./timeslot";


/** 
 * Movie data type
 */
export interface Movie {

    _id: ObjectId | undefined;

    title: string;

    description: string;

    timeSlots : Timeslot[] | undefined

}