import { ObjectId } from "mongodb";

/** 
 * Timeslot data type
 */
export interface Timeslot {

    _id : ObjectId | undefined;

    movieId : string;

    remainingCapacity : number;

    capacity : number;

    startDate: Date;

    endDate: Date

    uids : string[] | undefined;

}