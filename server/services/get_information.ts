import { queryDatabase } from "../db";
import { QueryParams, isNumberString } from "../helpers/check";

export async function getCategory () {
  const categories = await queryDatabase('SELECT id, name FROM category');
  return categories;
}

export async function getSubcategory (categoryId: QueryParams) {

  const condition: string = isNumberString(categoryId) ? ' WHERE category_id = ' + categoryId : '';

  const subcategories = await queryDatabase('SELECT id, name FROM subcategory' + condition);
  return subcategories;
}

export async function getQuiz (categoryId: QueryParams, limit: QueryParams) {
  const condition: string = isNumberString(categoryId) ? ' WHERE category_id = ' + categoryId : '';

  const limitQuery: string =  ' LIMIT ' + (isNumberString(limit) ? limit : '1');

  const quizzes = await queryDatabase('SELECT id, name FROM quiz' + condition + ' ORDER BY RANDOM()' + limitQuery);

  return quizzes;
}