import type { NucQuestionObjectInterface } from 'nucleify'

export interface NucSectionFaqInterface {
  questions?: NucQuestionObjectInterface | NucQuestionObjectInterface[]
  site?: string
  lang?: string
}

export interface UseSplitQuestionsInterface {
  column1: NucQuestionObjectInterface[]
  column2: NucQuestionObjectInterface[]
}
