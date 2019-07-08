//add dotenv here
require('dotenv').config();

// config server and port connect up
const server=require('./api/server');
const port=process.env.PORT || 5500;


//dial up the server here
server.listen(port, () =>
console.log(`\n****Server listening on port ${port}****\n`));