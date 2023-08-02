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

  console.log('📨  Adding GET subcategory route...');
	apiRouter.get('/subcategory', async(req: Request, res: Response) => {
    try {
      const categoryId = req.query?.categoryId;
      const result = await queryDatabase('SELECT id, name FROM subcategory' + (categoryId ? ' WHERE category_id = ' + categoryId : ''));
      res.json(result);
    } catch (error) {
      console.error('Error while getting items', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

	console.log('🛠️  Applying API router to Express server...');
	app.use('/api', apiRouter);
}
