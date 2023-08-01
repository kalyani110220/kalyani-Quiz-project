import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const app: Express = express();
const port: number = 3000;

app.use(cors());

app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'Quiz API running' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
