'use strict';

const yelp = require('yelp-fusion');
const client = yelp.client('sTF3Qt-eSGek1fwacuhYriNo6Frzy0AgRkBtqH6YViKLEa8LK_GzoQeWJb2OAjoFZgcVVmMHhaApsOCXV1tLU5x0Yw1pW2MsEziLR58muo6TXHESDCyvFlMwy_89XnYx');

client.search({
  term: 'miku', // This is where we'll input our search field query.
  location: 'vancouver, bc',
}).then(response => {
  console.log(response.jsonBody.total);  //.total will show all hits, can use .business for info to parse out the body
}).catch(e => {
  console.log(e);
});
