import express from 'express';
import cors from 'cors';
import db from './config/dbConnect.js';

import loginRoutes from './routes/loginRoutes.js';
import registerRoutes from './routes/registerRoutes.js';
import userRoute from './routes/userRoute.js';

const app = express();
const port = process.env.PORT || 8800;


//compatibility
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use('/', loginRoutes);
app.use('/register', registerRoutes);
app.use('/users', userRoute);

//warnings

app.listen(port, () => {
    console.log('port status: on-line');
});

db.on('error', () => console.log('bank status: offline'));
db.once('open', () => console.log('bank status: on-line'));

