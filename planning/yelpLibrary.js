'use strict';

const yelp = require('yelp-fusion');
const client = yelp.client('sTF3Qt-eSGek1fwacuhYriNo6Frzy0AgRkBtqH6YViKLEa8LK_GzoQeWJb2OAjoFZgcVVmMHhaApsOCXV1tLU5x0Yw1pW2MsEziLR58muo6TXHESDCyvFlMwy_89XnYx');

let restaurant = 'Miku' // This is where we'll input our search field query.

client.search({
  term: restaurant,
  location: 'vancouver, bc',
}).then(response => {
  const businesses = response.jsonBody.businesses; // Returns an array of businesses
  for (let business of businesses) {
    for (let x in business) {
      if (business[x] === restaurant) { // Needs to check against our search field query.
      console.log('you have something', business[x]); // Change what it needs to return.
      }
    }
  }
}).catch(e => {
  console.log(e);
});
