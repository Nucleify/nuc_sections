<template>
  <div class="faq-section container">
    <ad-paragraph class="faq-section-header">
      <span>F</span>
      <span>A</span>
      <span>Q</span>
    </ad-paragraph>

    <div class="faq-section-questions">
      <ad-accordion
        v-if="column1"
        :panels="column1"
        ad-type="main"
        :hexagons="true"
      />
      <ad-accordion
        v-if="column2"
        :panels="column2"
        ad-type="main"
        :hexagons="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'

import type { NucQuestionObjectInterface, NucSectionFaqInterface } from 'atomic'
import { questionRequests, useSplitQuestions } from 'atomic'

const props = defineProps<NucSectionFaqInterface>()

const column1 = ref<NucQuestionObjectInterface[]>([])
const column2 = ref<NucQuestionObjectInterface[]>([])

const route = useRoute()

const lang = computed(() => props.lang || route.params.lang || 'en')

const { getSiteQuestionsByLang, resultsByLang } = questionRequests()

onMounted(() => {
  getSiteQuestionsByLang(props.site, lang.value, false)
})

watchEffect(() => {
  const questions =
    props.questions || resultsByLang.value?.length ? resultsByLang.value : []
  if (!questions) return
  ;({ column1: column1.value, column2: column2.value } =
    useSplitQuestions(questions))
})
</script>
