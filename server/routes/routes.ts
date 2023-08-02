import express, { Express, Request, Response } from "express";
import { queryDatabase } from "../db";

export function addAPIRoutes(app: Express) {
	console.log('🛠️  Creating API router...');

	const apiRouter = express.Router();
	apiRouter.use((req, res, next) => {
		res.setHeader('Content-Type', 'application/json');
		next();
	});

	console.log('📨  Adding GET category route...');
	apiRouter.get('/category', async(req: Request, res: Response) => {
    try {
      const result = await queryDatabase('SELECT id, name FROM category');
      res.json(result);
    } catch (error) {
      console.error('Error while getting items', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

	console.log('🛠️  Applying API router to Express server...');
	app.use('/api', apiRouter);
}
