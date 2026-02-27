<template>
  <section id="footer">
    <nuc-grid-background />
    <div class="footer-cta">
      <ad-heading :tag="2" :text="t('footer-cta-heading')" class="cta-heading" />
      <p class="cta-subheading">{{ t('footer-cta-subheading') }}</p>
      <nuc-section-email-us-dialog />
    </div>

    <div class="footer-content-container">
      <div class="top">
        <div class="brand">
          <ad-anchor :href="`/${route.params.lang}/home#start`" class="header">
            <ad-logo :dimensions="isMobile() ? 36 : 48" ad-type="main" />
            <ad-heading :tag="3" text="Nucleify" class="name" />
          </ad-anchor>
        </div>

        <div class="columns">
          <div
            v-for="(column, columnIndex) in columns"
            :key="columnIndex"
            :class="`column`"
          >
            <nuxt-link
              v-for="(item, itemIndex) in column"
              :key="itemIndex"
              :to="item.url"
            >
              <ad-paragraph
                v-if="item?.header"
                class="column-header"
                :text="item.name"
              />
              <span v-else>{{ item.name }}</span>
            </nuxt-link>
          </div>
        </div>
      </div>

      <div class="bottom">
        <div class="company-info">
          <a :href="companyLink" target="_blank">
            {{ t('footer-company-name') }}
          </a>
          <span class="separator">|</span>
          <a :href="companyLink" target="_blank">
            {{ t('footer-company-nip') }}
          </a>
          <span class="separator">|</span>
          <a :href="companyLink" target="_blank">
            {{ t('footer-company-address') }}
          </a>
          <span class="separator">|</span>
          <a :href="`mailto:${t('footer-company-email')}`">
            {{ t('footer-company-email') }}
          </a>
        </div>
        <span class="copyright">
          {{ t('footer-copyright', { year }) }}
        </span>
      </div>
    </div>
    <nuc-animation-hexagons />
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { isMobile } from 'atomic'

import { getColumns } from './items'

const route = useRoute()
const { t } = useI18n()
const year = new Date().getFullYear()

const companyLink =
  'https://aleo.com/pl/firma/atomic-it-spolka-z-ograniczona-odpowiedzialnoscia'

const columns = computed(() => {
  const lang = (route.params.lang as string) || 'en'
  return getColumns(lang, t)
})
</script>
