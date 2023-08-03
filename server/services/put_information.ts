import { queryDatabase } from "../db";
import { QueryParams } from "../helpers/check";

export async function putAnswer (roundId: QueryParams, questionNumber: QueryParams, correct: QueryParams) {
  const correctQuery = correct === 'true' ? ', correct = correct + 1' : '';

  const roundInfo = await queryDatabase(`UPDATE round SET answered = ${questionNumber}${correctQuery} WHERE round.id = ${roundId} returning quiz_id`);

  const { quiz_id } = roundInfo[0];

  const countInfo = await queryDatabase(`select COUNT(*) as "numberOfQuestions" from quiz_question_relation where quiz_id = ${quiz_id}`)

  const { numberOfQuestions } = countInfo[0];

  const finished = numberOfQuestions === questionNumber;

  if (finished)
    await queryDatabase(`UPDATE round SET status = 'finished' WHERE round.id = ${roundId}`)

  return [
    {
      message: 'success',
      finished
    }
  ];
}