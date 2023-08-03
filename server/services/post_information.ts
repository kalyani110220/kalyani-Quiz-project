import { queryDatabase } from "../db";
import { QueryParams } from "../helpers/check";

export async function postStart (quizId: QueryParams) {
  const roundInfo = await queryDatabase(`INSERT INTO round (quiz_id, answered, correct, status) VALUES (${quizId}, 0, 0, 'started') RETURNING id, 'success' as message`);
  return roundInfo;
}