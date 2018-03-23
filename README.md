## Instructions
- `npm install`
- `npm test`
- `npm start`
- pull up `http://localhost:3000`
- visit at: `https://concurrency-converter.herokuapp.com/`

## Intent

The application's primary purpose was to create a simple currency converter that utilized Redux Thunk to handle async API calls to retrieve exchange rate information.  

## Functionality

- Pulls daily exchange rates from API
- Allows user to select origin and destination currencies and amounts
- Stores currency orders in a hosted PostreSQL database
- Has basic testing, which will be expanded 
- Deployed on heroku
- Responsive web design whichworks on mobile
- Uses Redux to manage state changes from user interaction and AJAX calls
- Employes a logical flow of data, for ease in debugging and data flow visualization 

## Technologies Used

- React
- Redux
- Node
- Express
- PostgreSQL
- Heroku
- Mocha
- Chai
