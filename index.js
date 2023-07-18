import express from 'express'
import dotenv from 'dotenv'

dotenv.config();
const port = process.env.PORT || 5000;
import cookieParser from 'cookie-parser';
import gameRoutes from './routes/gameRoute.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cors from 'cors';
import path from 'path'

connectDB();

const logRequests = (req, res, next) => {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.url}`);
    next(); // Call next() to proceed to the next middleware or route handler
};

const _dirname = path.dirname("")
const buildPath = path.join(_dirname  , "../tic-tac-fe/dist");

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser());

app.use(logRequests);

app.use('/api/game',gameRoutes);
app.use(express.static(buildPath))

app.get("/*", function(req, res){

    res.sendFile(
        path.join(__dirname, "../tic-tac-fe/dist/index.html"),
        function (err) {
          if (err) {
            res.status(500).send(err);
          }
        }
      );

})

app.use(notFound);
app.use(errorHandler);

app.listen(
    port,
    () => console.log(`Server started on PORT: ${port}`)
)