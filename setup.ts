import { collections, connectToDatabase } from "./src/api/services/database.s";
import { Movie } from "./src/api/models/movie";
import { Timeslot } from "./src/api/models/timeslot";


require('dotenv').config();

connectToDatabase().then(async ()=>{

    await collections.movies?.deleteMany({})
    await collections.timeslots?.deleteMany({})


    const movie: Movie = {
        _id: undefined,
        title: "Dummy movie",
        description: "Watch the dumbest movie ever on this june!",
        timeSlots: undefined
    }
    
    // adding new test document {{Movie document}}
    await collections.movies?.insertOne(movie).then(async (result)=> {
    
        console.log("Movie document added succesfully!")
    
        let startDate: Date = new Date()
    
        let endDate: Date = new Date()
    
        endDate.setMinutes(endDate.getMinutes() + 60)
    
    
        const timeslot: Timeslot = {
            _id: undefined,
            movieId: result.insertedId!.toString(), 
            remainingCapacity: 10,
            capacity: 10,
            startDate: startDate,
            endDate: endDate,
            uids: undefined
        }
    
        // adding new test document {{Timeslot document}}
        await collections.timeslots?.insertOne(timeslot).then((result)=>{
    
            console.log("Timeslot has been added succesfully!")
        })
    
        console.log("Setup finished!")
    
    
    })

}).then(()=>{
    process.exit()
})


