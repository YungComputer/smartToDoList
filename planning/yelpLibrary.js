'use strict';
require('dotenv').config({ path: '../.env' });


const yelp = require('yelp-fusion');
const key = process.env.YELP_API_KEY;
const client = yelp.client(key);
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
