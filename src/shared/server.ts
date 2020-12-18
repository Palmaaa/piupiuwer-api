import "reflect-metadata";
import express, { Request, Response, NextFunction }  from 'express';
import 'express-async-errors';
import routes from '@http/index.routes';
import cors from 'cors';

import './database'



const app = express();
//app.use(cors());
app.use(express.json())
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
            status: 'error',
            message: err.message,
        });
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
});

app.listen(3333, () => {
    console.log("INIT SERVER")
})