import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const app: Express = express();
const port: number = 3000;

app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
