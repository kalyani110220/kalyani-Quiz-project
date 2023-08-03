import { queryDatabase } from "../db";
import { QueryParams, isNumberString } from "../helpers/check";

export async function postStart (quizId: QueryParams) {
  if (!isNumberString(quizId)) throw new Error('Must contain quizId and it must be a number');
  const roundInfo = await queryDatabase(`INSERT INTO round (quiz_id, answered, correct, status) VALUES (${quizId}, 0, 0, 'started') RETURNING id`);
  return roundInfo;
}