import { Timestamp } from "mongodb";

export interface Timeslot {

    _id : string;

    movieId : string;

    availableCapacity : Number;

    capacity : Number;

    startDate: Date;

    endDate: Date

    uids : string[] | undefined;

}