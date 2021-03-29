# Caching Strategy

## Requirements
- How would you implement a caching mechanism for `getAvailability` - to be discussed in the call next week

## Implementation

- Implementation strategy using Redis

Consider the following schemas for

- Booking
```javascript
IBooking {
  _id?: string;
  resourceId: string;
  start: Date;
  end: Date;
}
```

- Resource
```javascript
IResource {
  _id?: string;
  name: string;
  shifts: IResourceShift[];
}
```

- Shift for Resource
```javascript
IResourceShift {
  begin: string;
  until: string;
  active: boolean;
}
```

I will implement a caching strategy such that, for every time a new appointment is created. we will generate keys with a following pattern for five minutes slot grid (based on minimum slot grids possible)

````[<resource_id>[date][time]]````

e.g. 

For a new appointment created for a resource with ````ObjectId("5fe0e5c61fe1eb4d30b777f8")```` on ````January 20th 2022````, between ````08:00 - 08:45````, we will create 9 slots such as following

````javascript
client.set({
  '5fe0e5c61fe1eb4d30b777f8[2022-01-20][08:00]': true,
  '5fe0e5c61fe1eb4d30b777f8[2022-01-20][08:05]': true,
  '5fe0e5c61fe1eb4d30b777f8[2022-01-20][08:10]': true,
  '5fe0e5c61fe1eb4d30b777f8[2022-01-20][08:15]': true,
  '5fe0e5c61fe1eb4d30b777f8[2022-01-20][08:20]': true,
  '5fe0e5c61fe1eb4d30b777f8[2022-01-20][08:25]': true,
  '5fe0e5c61fe1eb4d30b777f8[2022-01-20][08:30]': true,
  '5fe0e5c61fe1eb4d30b777f8[2022-01-20][08:35]': true,
  '5fe0e5c61fe1eb4d30b777f8[2022-01-20][08:40]': true,
  '5fe0e5c61fe1eb4d30b777f8[2022-01-20][08:45]': true
})
````

Now, in order to fetch the availability between minDate and maxDate. for a resource with resourceId ````ObjectId("5fe0e5c61fe1eb4d30b777f8")````, between dates
````2020-01-20 - 2020-01-25````, we will fetch all the keys between the dates using ````client.keys````

````javascript
  client.keys([
    '5fe0e5c61fe1eb4d30b777f8[2022-01-20][*]',
    '5fe0e5c61fe1eb4d30b777f8[2022-01-21][*]',
    '5fe0e5c61fe1eb4d30b777f8[2022-01-22][*]',
    '5fe0e5c61fe1eb4d30b777f8[2022-01-23][*]',
    '5fe0e5c61fe1eb4d30b777f8[2022-01-24][*]',
    '5fe0e5c61fe1eb4d30b777f8[2022-01-25][*]'
  ])
````