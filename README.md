# Fetch Rewards

### Installation

Make sure to have Node v12+ installed

1. Clone repository
```
git clone git@github
```

2. In console navigate to repo root directory and install dependencies
```
npm install
```

3. Run project with the following command
```
npm start
```


### Usage

Notes:
- The app runs on port 3001 so make sure to have that port open.
- Currently only user "Enrique" is available.


#### Adding Points
To add points to a user send POST request to the URI
```
http://localhost:3001/api/add-points/{USER_NAME_HERE}
```

With a JSON object in the following format
```
{
    "payerName": Name type string,
    "points": Number type Number
    "transactionDate": Date in format "MONTH/DAY HOUR AM|PM" of type string
}
```

** Some examples of a transactionDate would be "10/31 10AM" or "11/1 2PM"




#### Deducting Points
To deduct points from a user send POST request to the URI 

```
http://localhost:3001/api/deduct-points/{USER_NAME_HERE}

```

With a JSON object in the following format
```
{
    "points": Number type Number 
}
```


#### Get User Point Balance

To get a user's point balance, which consists of all the positive points a payer has given the user, send a GET request to the following URI

```
http://localhost:3001/api/point-balance/{USER_NAME_HERE}
```

