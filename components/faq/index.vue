<template>
  <div class="faq-section container">
    <ad-paragraph class="faq-section-header">
      <span>F</span>
      <span>A</span>
      <span>Q</span>
    </ad-paragraph>

    <div class="faq-section-questions" :class="{ 'faq-section-questions--single': isMobileView }">
      <!-- Mobile: one column, order 1→2→3→4→5→6... -->
      <ad-accordion
        v-if="isMobileView && allQuestions.length"
        :panels="allQuestions"
        ad-type="main"
        :hexagons="true"
      />
      <!-- Desktop: two columns, layout q1|q2, q3|q4... -->
      <template v-if="!isMobileView">
        <ad-accordion
          v-if="column1.length"
          :panels="column1"
          ad-type="main"
          :hexagons="true"
        />
        <ad-accordion
          v-if="column2.length"
          :panels="column2"
          ad-type="main"
          :hexagons="true"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NucQuestionObjectInterface, NucSectionFaqInterface } from 'atomic'
import { questionRequests, useSplitQuestions } from 'atomic'

const MOBILE_MAX_WIDTH = 992

const props = defineProps<NucSectionFaqInterface>()

const column1 = ref<NucQuestionObjectInterface[]>([])
const column2 = ref<NucQuestionObjectInterface[]>([])
const allQuestions = ref<NucQuestionObjectInterface[]>([])
const isMobileView = ref(true)

const route = useRoute()

const lang = computed(() => {
  const p = route.params.lang
  return (props.lang ?? (Array.isArray(p) ? p[0] : p) ?? 'en') as string
})

const { getSiteQuestionsByLang, resultsByLang } = questionRequests()

function updateMobileView(): void {
  if (import.meta.client) {
    isMobileView.value = window.innerWidth <= MOBILE_MAX_WIDTH
  }
}

onMounted(() => {
  getSiteQuestionsByLang(props.site ?? 'home', lang.value, false)
  updateMobileView()
})

watchEffect(() => {
  const raw =
    props.questions ?? (resultsByLang.value?.length ? resultsByLang.value : [])
  const list: NucQuestionObjectInterface[] = Array.isArray(raw)
    ? raw.filter((q): q is NucQuestionObjectInterface => q != null)
    : raw != null
      ? [raw]
      : []
  if (!list.length) return
  allQuestions.value = list
  ;({ column1: column1.value, column2: column2.value } =
    useSplitQuestions(list))
})
</script>
