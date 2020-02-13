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
    const lowerCaseName = task.toLowerCase();

    for (let business of businesses) {
      const businessName = business.name.toLowerCase();

      if (businessName.search(lowerCaseName) === 0){
        console.log('You have restaurant:', businessName)
        return true;
      }
    }
    console.log('Can\'t find that restaurant:', task)
    return false;
  })
  .catch(e => {
    console.log(e);
  });
}

module.exports = { restaurant };
