import express, { Express, Request, Response } from "express";
import apiRouter from './src/routes';
import connectionDB from './src/connection/connection';

const app: Express = express();
const morgan = require('morgan');
const port = 3000;


app.use(morgan('dev'));

app.use(express.json());

app.use(apiRouter);


connectionDB();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});