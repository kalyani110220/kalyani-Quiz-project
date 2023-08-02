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
      console.error('Error while getting categories', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  console.log('📨  Adding GET subcategory route...');
	apiRouter.get('/subcategory', async(req: Request, res: Response) => {
    try {
      const categoryId = req.query?.categoryId;
      const condition: string = categoryId ? ' WHERE category_id = ' + categoryId : '';

      const result = await queryDatabase('SELECT id, name FROM subcategory' + condition);
      res.json(result);
    } catch (error) {
      console.error('Error while getting subcategories', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  console.log('📨  Adding GET quiz route...');
	apiRouter.get('/quiz', async(req: Request, res: Response) => {
    try {
      const categoryId = req.query?.categoryId;
      const condition: string = categoryId ? ' WHERE category_id = ' + categoryId : '';

      let numberOfReturns = req.query?.numberOfReturns;

      if (typeof numberOfReturns !== 'string' || isNaN(parseInt(numberOfReturns)))
        numberOfReturns = '1';

      const limit: string =  ' LIMIT ' + numberOfReturns;

      const result = await queryDatabase('SELECT id, name FROM quiz' + condition + ' ORDER BY RANDOM()' + limit);
      res.json(result);
    } catch (error) {
      console.error('Error while getting quizzes', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

	console.log('🛠️  Applying API router to Express server...');
	app.use('/api', apiRouter);
}
