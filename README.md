# Circlys Movie Reservation System.

this project is an simple movie reservation system using express framework & mongoDB for circlys interview exam


## introduction

this application used express js for building apis & mongodb through the application the app used MVC design pattern for structuring the project

## Challenge Objective:

Build a simple RESTful API using Node.js, Express.js, and MongoDB to manage a movie reservation system.

## Requirements
1. Movie Listing Endpoint
    - An API endpoint to retrieve a list of available movies.
    - Each movie should have a title and a list of available time slots with their capacities.
2. Check Availability Endpoint
    - An API endpoint to check the availability of a specific time slot for a movie.
    - The endpoint should take the movie ID and time slot ID as parameters and return the availability (remaining capacity) for that time slot.
3. Reserve Time Slot Endpoint
    - An API endpoint to reserve a time slot for a movie.
    - The endpoint should take the movie ID, time slot ID, and the number of people to reserve for.
    - Ensure that the reservation does not exceed the available capacity of the time slot.
    - Update the booked count for the reserved time slot.

### Project structure 

in this project i used the mvc design pattern to make the project easy to understand , more scalable, well-structured and to solve in-future common issues
 - src
    - api
      -  controllers <br>
      &nbsp;&nbsp;&nbsp; controllers contains buisness logic for routes
      -  helpers <br>
      &nbsp;&nbsp;&nbsp; helpers contains duplicated code to use globaly
      -  middlewares <br>
      &nbsp;&nbsp;&nbsp; middlewares contains validation functionalites for endpoints requests
      -  models <br>
      &nbsp;&nbsp;&nbsp; models contains implemntation for mongodb schemas
      -  routes <br>
      &nbsp;&nbsp;&nbsp; routes contains the routes files that handles the requests
      -  services <br>
      &nbsp;&nbsp;&nbsp; services contains files that intracts with database


### Quick guidelines

1. install npm packages
```bash
npm install
```
2. run setup script
```bash
npm run setup
```
3. start the app
```bash
npm run start
```
4. use postman collection for testing <br> <br>
[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/24446585-c368f04f-0012-46c6-839b-ceb524700fee?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D24446585-c368f04f-0012-46c6-839b-ceb524700fee%26entityType%3Dcollection%26workspaceId%3D023be4b8-054f-4d91-a997-f054239dadfc)

## ER Diagram

here's a simple ER diagram to simulate the needed requierments I added users entity because requierments related to the user
![moviesERD](https://github.com/ziadx3/circlys-api-exam/assets/90929334/105bc369-331a-4bd4-86a0-528813983e6e)


> :warning: If you will link this app to local mongodb you should follow this article to make some configruation <link>https://www.mongodb.com/docs/manual/tutorial/convert-standalone-to-replica-set/</link>





