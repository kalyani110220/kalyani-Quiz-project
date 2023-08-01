import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port: number = 3000;

app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'Quiz API running' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
