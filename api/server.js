//import dependencies here
const express=require('express');
const helmet=require('helmet');
const morgan=require('morgan');
const cors=require('cors');

//create server
const server=express();

//tell server how to parse json
server.use(express.json());
//tell server to use dependencies
server.use(helmet());
server.use(morgan('combined'));
server.use(cors());

// Router Links
const userRouter = require('../routes/user_routes');
const statsRouter = require('../routes/sleep_stats_routes')
const actionsRouter = require('../routes/sleep_actions_routes')

//server sanity check
server.get('/', (req,res) => {
    res.json({msg:"Interesting. You\'re afraid of insects and women. Ladybugs must render you catatonic."});
});

server.use('/', userRouter)
server.use('/sleep-stats', statsRouter)
server.use('/sleep-actions', actionsRouter)

//don't forget to export module here
module.exports=server;