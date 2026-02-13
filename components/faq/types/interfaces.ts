import type { NucQuestionObjectInterface } from 'atomic'

export interface NucSectionFaqInterface {
  questions?: NucQuestionObjectInterface | NucQuestionObjectInterface[]
  site?: SiteType
  lang?: string
}

export interface UseSplitQuestionsInterface {
  column1: NucQuestionObjectInterface[]
  column2: NucQuestionObjectInterface[]
}
