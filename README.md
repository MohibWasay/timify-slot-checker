
# Timify Slot Checker

Timify Slot checker checks for availablility and returns starting dates all the available slots that can be booked for a particular resource.

## Run this project

- Install node.js, mongodb, redis (optional)
- Create and .env file on the root of the project and add the following 
````
DATABASE_URL=mongodb://localhost/timifydb
PREPOPULATE_DATA=true # if this is set to true, it will generate random bookings and events, set to true only for first time
````

## Build and Run
- Install the dependencies:
```
yarn
```

- Start the server:
```
yarn start
```

- Build and run the app:
```
yarn build
yarn start:prod
```

- Run the tests:
```
yarn test
```