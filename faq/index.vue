<template>
  <section id="faq" class="faq-section">
    <nuc-grid-background class="faq-grid" />

    <div class="container">
      <ad-paragraph class="faq-section-header">
        <span>F</span>
        <span>A</span>
        <span>Q</span>
      </ad-paragraph>

      <div
        class="faq-section-questions"
        :class="{ 'faq-section-questions--single': isMobileView }"
      >
        <!-- Mobile: one column, order 1→2→3→4→5→6... -->
        <ad-accordion
          v-if="isMobileView && allQuestions?.length"
          :panels="allQuestions"
          nui-type="main"
        />
        <!-- Desktop: two columns, layout q1|q2, q3|q4... -->
        <template v-if="!isMobileView">
          <ad-accordion
            v-if="column1?.length"
            :panels="column1"
            nui-type="main"
          />
          <ad-accordion
            v-if="column2?.length"
            :panels="column2"
            nui-type="main"
          />
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type {
  NucQuestionObjectInterface,
  NucSectionFaqInterface,
} from 'nucleify'
import { questionRequests, useSplitQuestions } from 'nucleify'

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
    props.questions ??
    (Array.isArray(resultsByLang.value) && resultsByLang.value.length
      ? resultsByLang.value
      : [])
  const list: NucQuestionObjectInterface[] = Array.isArray(raw)
    ? raw.filter((q): q is NucQuestionObjectInterface => q != null)
    : raw != null
      ? [raw]
      : []
  if (!list.length) {
    allQuestions.value = []
    column1.value = []
    column2.value = []
    return
  }
  allQuestions.value = list
  const split = useSplitQuestions(list)
  column1.value = split.column1 ?? []
  column2.value = split.column2 ?? []
})
</script>

<style lang="scss">
@import 'index';
</style>
