import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { addAPIRoutes } from './routes/routes';

const app: Express = express();
const port: number = 3000;

app.use(cors());

addAPIRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
