import type {
  NucQuestionObjectInterface,
  UseSplitQuestionsInterface,
} from 'atomic'

export function useSplitQuestions(
  questions: NucQuestionObjectInterface | NucQuestionObjectInterface[]
): UseSplitQuestionsInterface {
  const normalizedQuestions: NucQuestionObjectInterface[] = Array.isArray(
    questions
  )
    ? questions
    : [questions]

  // Split by odd/even index so layout flows left-to-right (row by row):
  // left column: 1st, 3rd, 5th... | right column: 2nd, 4th, 6th...
  const column1: NucQuestionObjectInterface[] = normalizedQuestions.filter(
    (_, i) => i % 2 === 0
  )
  const column2: NucQuestionObjectInterface[] = normalizedQuestions.filter(
    (_, i) => i % 2 === 1
  )

  return { column1, column2 }
}
