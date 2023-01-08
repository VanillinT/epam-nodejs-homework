import express from 'express';
import dotenv from 'dotenv';
import { getBlueText } from '../consoleUtils';
import bodyParser from 'body-parser';
import users from './routes/users';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.use('/users', users);

app.listen(port, () => {
  console.log(
    `${getBlueText('server')} Server is running at http://localhost:${port}`,
  );
});
