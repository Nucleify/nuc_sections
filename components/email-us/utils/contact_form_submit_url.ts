/**
 * Endpoint Nitro (`POST` Resend + zapis). Zawsze host aplikacji + `/api/contact-form`,
 * nie `apiUrl()` — przy `NUXT_PUBLIC_API_URL` wskazującym na inny backend formularz i tak trafia do Nuxt.
 */
export function getContactFormSubmitUrl(): string {
  if (import.meta.client && typeof window !== 'undefined') {
    return new URL('/api/contact-form', window.location.origin).href
  }
  return '/api/contact-form'
}
