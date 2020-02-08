'use strict';

const yelp = require('yelp-fusion');
const client = yelp.client('sTF3Qt-eSGek1fwacuhYriNo6Frzy0AgRkBtqH6YViKLEa8LK_GzoQeWJb2OAjoFZgcVVmMHhaApsOCXV1tLU5x0Yw1pW2MsEziLR58muo6TXHESDCyvFlMwy_89XnYx');

client.search({
  term: 'burger',
  location: 'vancouver, bc',
}).then(response => {
  console.log(response.jsonBody.total);
}).catch(e => {
  console.log(e);
});
