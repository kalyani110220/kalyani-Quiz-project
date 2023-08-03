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

export async function getQuestion (quizId: QueryParams, questionNumber: QueryParams) {
  if (!isNumberString(quizId)) throw new Error('Must contain quizId and it must be a number');
  if (!isNumberString(questionNumber)) throw new Error('Must contain questionNumber and it must be a number');

  const questionAnswerQuery = `SELECT qu.id AS "questionId", qu.text AS question, a.id AS "answerId", a.text AS 
                                answer FROM quiz_question_relation AS qqr JOIN question AS qu ON qqr.question_id
                                = qu.id JOIN answer AS a ON qu.answer_id = a.id WHERE qqr.quiz_id = ${quizId} AND 
                                qqr.question_number = ${questionNumber}`;

  const questionAnswerInfo = await queryDatabase(questionAnswerQuery);

  if (questionAnswerInfo.length === 0) throw new Error('This question does not exist');

  const info = questionAnswerInfo[0];

  const answers = await getAllAnswers(info.questionId, info.answerId, info.answer);

  return [
    {
      id: info.questionId,
      questionText: info.question,
      multipleChoice: true,
      answers
    }
  ];
}

async function getAllAnswers(questionId: string, answerId: string, answer: string) {
  const otherAnswerQuery = `SELECT a.id AS "answerId", a.text AS answer, false AS correct FROM answer AS a JOIN subcategory_relation AS sr ON a.id = 
                              sr.answer_id AND sr.subcategory_id IN (select subcategory_id FROM subcategory_relation 
                              WHERE question_id = ${questionId}) WHERE NOT a.id = ${answerId} AND a.type_id 
                              = (SELECT type_id FROM question WHERE id = ${questionId}) ORDER BY RANDOM() LIMIT 3;`;

  const otherAnswerInfo = await queryDatabase(otherAnswerQuery);

  otherAnswerInfo.splice(Math.floor(Math.random() * 4), 0, {answerId, answer, correct: true})

  return otherAnswerInfo;
}