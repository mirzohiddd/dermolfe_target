<script setup>
import { computed } from 'vue'
import logoWhite from '@/assets/images/logo-white.webp'
import AppIcon from '@/components/ui/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { site, phoneHref } from '@/config/site'
import { scrollToForm } from '@/composables/useScrollTo'

const c = site.contacts
const year = new Date().getFullYear()

const contactItems = computed(() =>
  [
    c.phone && { icon: 'phone', label: c.phone, href: phoneHref(c.phone), external: false },
    c.telegram && { icon: 'telegram', label: 'Telegram', href: c.telegram, external: true },
    c.instagram && { icon: 'instagram', label: 'Instagram', href: c.instagram, external: true },
    c.workingHours && { icon: 'clock', label: c.workingHours },
    c.address && { icon: 'map-pin', label: c.address },
  ].filter(Boolean),
)
</script>

<template>
  <footer id="footer" class="bg-navy-900 text-navy-100">
    <div class="container-page grid gap-10 py-14 sm:py-16 md:grid-cols-[1.3fr_1fr] md:gap-16">
      <div>
        <img :src="logoWhite" alt="Dermolife Complex" width="334" height="80" loading="lazy" class="h-11 w-auto" />
        <p class="mt-5 max-w-sm leading-relaxed text-navy-200">
          Сироп, крем ва совундан иборат табиий комплекс — терини ичдан ва ташқаридан парвариш қилади.
        </p>
        <BaseButton class="mt-7" variant="light" icon="arrow-right" @click="scrollToForm">
          Консультация олиш
        </BaseButton>
      </div>

      <div v-if="contactItems.length">
        <h3 class="text-sm font-bold tracking-[0.14em] text-white uppercase">Алоқа</h3>
        <ul class="mt-5 space-y-3">
          <li v-for="item in contactItems" :key="item.icon">
            <component
              :is="item.href ? 'a' : 'span'"
              :href="item.href || undefined"
              :target="item.external ? '_blank' : undefined"
              :rel="item.external ? 'noopener' : undefined"
              class="inline-flex items-center gap-3 font-semibold text-white/90 transition"
              :class="item.href && 'hover:text-leaf-400'"
            >
              <span class="grid h-10 w-10 place-items-center rounded-xl bg-white/8 text-leaf-400">
                <AppIcon :name="item.icon" :size="19" />
              </span>
              {{ item.label }}
            </component>
          </li>
        </ul>
      </div>
      <div v-else class="self-end">
        <p class="max-w-xs leading-relaxed text-navy-200">
          Саволларингиз бўлса, ариза қолдиринг — малакали мутахассисимиз ўзи сиз билан боғланади.
        </p>
      </div>
    </div>

    <div class="border-t border-white/10">
      <div
        class="container-page flex flex-col gap-2 py-6 pb-28 text-xs leading-relaxed text-navy-200/80 sm:flex-row sm:items-center sm:justify-between sm:pb-6"
      >
        <p>© {{ year }} {{ site.brand }}. Барча ҳуқуқлар ҳимояланган.</p>
        <p class="max-w-md sm:text-right">
          Натижалар ҳар бир организмда индивидуал. Қўллашдан олдин малакали мутахассис билан маслаҳатлашинг.
        </p>
      </div>
    </div>
  </footer>
</template>
