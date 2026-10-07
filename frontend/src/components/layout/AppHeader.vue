<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import logo from '@/assets/images/logo.webp'
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { site, phoneHref } from '@/config/site'
import { scrollToForm, scrollToSection } from '@/composables/useScrollTo'

const links = [
  { id: 'muammolar', label: 'Муаммолар' },
  { id: 'dermolife', label: 'Dermolife' },
  { id: 'natijalar', label: 'Натижалар' },
  { id: 'mutaxassis', label: 'Мутахассис' },
]

const scrolled = ref(false)
const onScroll = () => (scrolled.value = window.scrollY > 12)
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition duration-300"
    :class="scrolled ? 'bg-white/85 shadow-[0_1px_0_rgb(0_33_63/0.06)] backdrop-blur-lg' : 'bg-transparent'"
  >
    <div class="container-page flex h-16 items-center justify-between gap-4 sm:h-[72px]">
      <a href="#" class="shrink-0" aria-label="Dermolife Complex — бош саҳифа" @click.prevent="scrollToSection('top')">
        <img :src="logo" alt="Dermolife Complex" width="334" height="80" class="h-8 w-auto min-[400px]:h-9 sm:h-10" />
      </a>

      <nav class="hidden items-center gap-1 lg:flex" aria-label="Асосий меню">
        <a
          v-for="link in links"
          :key="link.id"
          :href="`#${link.id}`"
          class="rounded-xl px-3.5 py-2 text-[15px] font-semibold text-navy-700/80 transition hover:bg-navy-50 hover:text-navy-800"
          @click.prevent="scrollToSection(link.id)"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="flex items-center gap-2">
        <a
          v-if="site.contacts.phone"
          :href="phoneHref(site.contacts.phone)"
          class="inline-flex items-center gap-1.5 rounded-xl bg-navy-50 px-2.5 py-2 text-[13px] font-bold whitespace-nowrap text-navy-800 transition hover:bg-navy-100 sm:gap-2 sm:bg-transparent sm:px-3 sm:text-[15px] sm:hover:bg-navy-50"
          title="Қўнғироқ қилиш"
        >
          <AppIcon name="phone" :size="17" class="shrink-0 text-leaf-600" />
          {{ site.contacts.phone }}
        </a>
        <div class="hidden sm:block">
          <BaseButton @click="scrollToForm">Консультация олиш</BaseButton>
        </div>
      </div>
    </div>
  </header>
</template>
