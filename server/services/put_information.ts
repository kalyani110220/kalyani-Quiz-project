import { queryDatabase } from "../db";
import { QueryParams, isBooleanString, isNumberString } from "../helpers/check";

export async function putAnswer (roundId: QueryParams, questionNumber: QueryParams, correct: QueryParams) {
  if (!isNumberString(roundId)) throw new Error('Must contain roundId and it must be a number');
  if (!isNumberString(questionNumber)) throw new Error('Must contain questionNumber and it must be a number');
  if (!isBooleanString(correct)) throw new Error('Must contain questionNumber and it must be a boolean');

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