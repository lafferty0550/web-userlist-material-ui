import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
require('dotenv').config();

import rootRoute from './routes';

let server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(express.static(path.resolve('build', 'public')));
server.use('/api/', rootRoute);

import db from './models';

db.mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

server.listen(process.env.PORT, () => {
    console.log(`App is listening at http://localhost:${process.env.PORT}`);
});


// for jest
export default server;