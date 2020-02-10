'use strict';
// require('dotenv').config({ path: '../.env' });
// Leave this for testing as standalone


const yelp = require('yelp-fusion');
const key = process.env.YELP_API_KEY;
const client = yelp.client(key);

const restaurant = (task) => {

  return client.search({
  term: task,
  location: 'vancouver, bc',
  })
  .then(response => {

    const businesses = response.jsonBody.businesses; // Returns an array of businesses
    for (let business of businesses) {
      for (let x in business) {
        if (business[x] === task) { // Needs to check against our search field query.

        console.log('you have restaurant:', task); // Change what it needs to return.
        return true;
        }
      }
    }
    return false;

  })
  .catch(e => {
    console.log(e);
  });
}


// console.log(restaurant('Miku'), 'this is the function')

module.exports = { restaurant };
