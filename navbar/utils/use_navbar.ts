'use client'

import type { Ref } from 'vue'

import type { AppFramework, AuthFormSetFields } from 'nucleify'
import { createEntityScalarState, resolveScalar } from 'nucleify'

import type { UseNavbarInterface } from '../interfaces'
import type { UseNavbarInterface as UseNavbarReactInterface } from '../interfaces.react'

type UseNavbarReturn<F extends AppFramework = 'nuxt'> = F extends 'next'
  ? UseNavbarReactInterface
  : UseNavbarInterface

export function useNavbar<const F extends AppFramework = 'nuxt'>(
  framework?: F
): UseNavbarReturn<F> {
  const resolved: AppFramework = framework ?? 'nuxt'
  const { value: navbarExpanded, setValue: setNavbarExpanded } =
    createEntityScalarState<boolean>(resolved, false)

  function toggleNavbar(): void {
    if (resolved === 'next') {
      ;(setNavbarExpanded as AuthFormSetFields<boolean>)((prev) => !prev)
      return
    }

    setNavbarExpanded(!resolveScalar(navbarExpanded))
  }

  if (resolved === 'next') {
    return {
      navbarExpanded,
      toggleNavbar,
    } as UseNavbarReturn<F>
  }

  return {
    navbarExpanded: navbarExpanded as unknown as Ref<boolean>,
    toggleNavbar,
  } as UseNavbarReturn<F>
}
