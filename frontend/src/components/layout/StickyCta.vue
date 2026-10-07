<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { scrollToForm } from '@/composables/useScrollTo'

/** Mobil: hero'dan o'tgach paydo bo'ladi, forma ko'ringanda yashirinadi */
const visible = ref(false)
let pastHero = false
let formVisible = false
let observers = []

const update = () => (visible.value = pastHero && !formVisible)

onMounted(() => {
  const hero = document.getElementById('top')
  const form = document.getElementById('ariza')
  const footer = document.getElementById('footer')
  if (hero) {
    const o = new IntersectionObserver(([e]) => {
      pastHero = !e.isIntersecting
      update()
    }, { rootMargin: '-40% 0px 0px 0px' })
    o.observe(hero)
    observers.push(o)
  }
  const targets = [form, footer].filter(Boolean)
  const seen = new Map()
  const o2 = new IntersectionObserver((entries) => {
    entries.forEach((e) => seen.set(e.target, e.isIntersecting))
    formVisible = [...seen.values()].some(Boolean)
    update()
  })
  targets.forEach((t) => o2.observe(t))
  observers.push(o2)
})
onBeforeUnmount(() => observers.forEach((o) => o.disconnect()))
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="translate-y-full opacity-0"
    leave-active-class="transition duration-200 ease-in"
    leave-to-class="translate-y-full opacity-0"
  >
    <div
      v-if="visible"
      class="fixed inset-x-0 bottom-0 z-40 border-t border-navy-100/70 bg-white/90 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-lg sm:hidden"
    >
      <BaseButton block size="lg" icon="arrow-right" @click="scrollToForm">Консультация олиш</BaseButton>
    </div>
  </Transition>
</template>
