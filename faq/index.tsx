'use client'

import { useParams, usePathname } from 'next/navigation'
import { type JSX, useEffect, useMemo, useState } from 'react'

import type {
  NucQuestionObjectInterface,
  NucSectionFaqInterface,
} from 'nucleify'
import {
  AdAccordion,
  apiRequest,
  resolveApiHandleData,
  useSplitQuestions,
} from 'nucleify'

import './_index.scss'

export function NucSectionFaq({
  questions: questionsProp,
  site = 'home',
  lang,
}: NucSectionFaqInterface): JSX.Element {
  const pathname = usePathname()
  const routeParams = useParams()
  const routeLang = routeParams?.lang
  const locale =
    lang ??
    (typeof routeLang === 'string' ? routeLang : undefined) ??
    pathname.split('/').filter(Boolean).at(0) ??
    'en'

  const [fetchedQuestions, setFetchedQuestions] = useState<
    NucQuestionObjectInterface[]
  >([])

  const shouldFetch = questionsProp === undefined

  useEffect(() => {
    if (!shouldFetch) return

    let cancelled = false

    void (async (): Promise<void> => {
      try {
        const response = await apiRequest<NucQuestionObjectInterface[]>(
          `/questions/get-site-questions/${site}/${locale}`
        )
        const data =
          resolveApiHandleData<NucQuestionObjectInterface[]>(response)

        if (!cancelled) {
          setFetchedQuestions(Array.isArray(data) ? data : [])
        }
      } catch {
        if (!cancelled) {
          setFetchedQuestions([])
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [shouldFetch, site, locale])

  const list = useMemo((): NucQuestionObjectInterface[] => {
    if (questionsProp !== undefined) {
      const raw = Array.isArray(questionsProp) ? questionsProp : [questionsProp]
      return raw.filter((q): q is NucQuestionObjectInterface => q != null)
    }
    return fetchedQuestions
  }, [questionsProp, fetchedQuestions])

  const { column1, column2 } = useMemo(() => useSplitQuestions(list), [list])

  const renderColumn = (panels: NucQuestionObjectInterface[]): JSX.Element => (
    <AdAccordion panels={panels} className="p-accordion" />
  )

  return (
    <section id="faq" className="faq-section">
      <p className="faq-section-header">
        <span>F</span>
        <span>A</span>
        <span>Q</span>
      </p>

      <div className="faq-section-questions">
        {column1.length > 0 && renderColumn(column1)}
        {column2.length > 0 && renderColumn(column2)}
      </div>
    </section>
  )
}
