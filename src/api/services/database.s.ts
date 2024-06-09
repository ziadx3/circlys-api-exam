import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { Movie } from "../models/movie";
import { Timeslot } from "../models/timeslot";

/**
 *  collections ref object
 */
export const collections: { 
    movies ?: mongoDB.Collection<Movie> ,
    timeslots ?: mongoDB.Collection<Timeslot>
} = {}

/** 
 * client ref object
 */
export let client : mongoDB.MongoClient;


/**
 * connect to the db and refers to the available collections
 */
export async function connectToDatabase () {

    // instance of mongo client
    client = new mongoDB.MongoClient(process.env.DB_CONN_STRING!);

    // connect to the database
    await client.connect();
    
    // ref to the database
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
    
    // ref the movies collection
    const moviesCollection = db.collection<Movie>(process.env.MOVIES_COLLECTION_NAME!);

    // ref the timeslots collection
    const timeslotsCollection = db.collection<Timeslot>(process.env.TIMESLOTS_COLLECTION_NAME!);
    
    // init the movies collection to the global var
    collections.movies = moviesCollection;

    // init the timeslots collection to the global var
    collections.timeslots = timeslotsCollection

    console.log(`Successfully connected to database: ${db.databaseName}`);
 }

