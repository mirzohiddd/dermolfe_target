<script setup>
import { computed } from 'vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import specialistImg from '@/assets/images/specialist.webp'
import { site } from '@/config/site'
import { scrollToForm } from '@/composables/useScrollTo'

const photos = { specialist: specialistImg }

/** Konsultatsiya jarayoni — mutaxassis bilan suhbatda nima bo'ladi */
const consultation = [
  'Терингиздаги муаммони батафсил ўрганади',
  'Dermolife комплексини қандай қўллашни тушунтиради',
  'Парвариш давомида саволларингизга жавоб беради',
]

const specialists = computed(() =>
  site.specialists.map((s) => ({
    ...s,
    displayName: s.name || 'Dermolife малакали мутахассиси',
    photo: photos[s.photoKey],
    points: s.facts?.length ? s.facts : consultation,
  })),
)
const single = computed(() => specialists.value.length === 1)
</script>

<template>
  <section id="mutaxassis" class="section bg-white">
    <div class="container-page">
      <SectionHeading
        eyebrow="Мутахассислар"
        :title="single ? 'Сизга малакали мутахассис маслаҳат беради' : 'Сизга малакали мутахассисларимиз маслаҳат беради'"
        text="Ариза қолдирганингиздан сўнг малакали мутахассис сиз билан боғланади ва муаммонгиз бўйича консультация беради."
      />

      <div :class="single ? '' : 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'">
        <article
          v-for="s in specialists"
          :key="s.id"
          v-reveal
          class="overflow-hidden rounded-[28px] bg-surface ring-1 ring-navy-100/70"
          :class="single && 'grid md:grid-cols-[0.9fr_1.1fr]'"
        >
          <div class="relative bg-gradient-to-br from-navy-700 to-navy-900" :class="single ? 'aspect-[4/5] md:aspect-auto' : 'aspect-[4/5]'">
            <img
              :src="s.photo"
              :alt="s.displayName"
              width="900"
              height="1347"
              loading="lazy"
              decoding="async"
              class="absolute inset-0 h-full w-full object-cover object-[50%_20%]"
            />
          </div>

          <div class="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
            <p class="inline-flex w-fit items-center gap-2 rounded-full bg-leaf-50 px-3 py-1 text-xs font-bold text-leaf-700">
              <AppIcon name="user-check" :size="15" />
              Dermolife жамоаси
            </p>
            <h3 class="mt-4 text-2xl font-extrabold tracking-[-0.02em] text-navy-800 sm:text-3xl">{{ s.displayName }}</h3>
            <p v-if="s.role" class="mt-1 font-semibold text-leaf-600">{{ s.role }}</p>

            <ul class="mt-6 space-y-3.5">
              <li v-for="point in s.points" :key="point" class="flex gap-3">
                <span class="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-leaf-600 text-white">
                  <AppIcon name="check" :size="14" :stroke-width="3" />
                </span>
                <span class="leading-relaxed text-navy-800">{{ point }}</span>
              </li>
            </ul>

            <BaseButton class="mt-8 w-full sm:w-fit" size="lg" icon="arrow-right" @click="scrollToForm">
              Консультация олиш
            </BaseButton>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
