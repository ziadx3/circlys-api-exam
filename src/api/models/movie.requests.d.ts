
/** 
 * check remaining timeslot capacity endpoint request data type
 */
export interface CheckMoviesRequest {

    movieId : string | undefined;

    timeslotId: string | undefined;

}

/**
 * Reserve endpoint request data type
 */
export interface ReserveTimeslotRequest {

    movieId: string | undefined;

    timeslotId: string | undefined;

    uid: string | undefined;

    numberOfreserves : number | undefined;

}