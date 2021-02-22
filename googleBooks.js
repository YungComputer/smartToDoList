const {google} = require('googleapis');
const blogger = google.blogger({
  version: 'v3',
  auth: 'AIzaSyBB8iVXadw6GW42T9yc_npFzJ8JDYPOX28' // specify your API key here
});

const params = {
  blogId: '3213900'
};

async function main(params) {
  const res = await blogger.blogs.get({blogId: params.blogId});
  console.log(`${res.data.name} has ${res.data.posts.totalItems} posts! The blog url is ${res.data.url}`)
};

main(params).catch(console.error);