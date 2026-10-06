<script setup>
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { results } from '@/data/content'
import { scrollToForm } from '@/composables/useScrollTo'
</script>

<template>
  <section id="natijalar" class="section bg-navy-800">
    <div class="container-page">
      <SectionHeading
        dark
        eyebrow="Natijalar"
        title="Mijozlarimiz natijalari"
        text="Dermolife kompleksini qo‘llagan mijozlarimizning real fotosuratlari. Taqqoslash uchun chiziqni suring."
      />

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <figure
          v-for="(r, i) in results"
          :key="r.id"
          v-reveal="(i % 3) * 80"
          class="rounded-3xl bg-white/[0.06] p-2.5 ring-1 ring-white/10"
        >
          <BeforeAfterSlider :before="r.before" :after="r.after" :alt="r.area" />
          <figcaption class="flex items-center justify-between px-2 pt-3 pb-1">
            <span class="font-bold text-white">{{ r.area }}</span>
            <span class="inline-flex items-center gap-1 text-xs font-semibold text-leaf-400">
              <AppIcon name="chevrons-lr" :size="14" /> suring
            </span>
          </figcaption>
        </figure>
      </div>

      <p v-reveal class="mx-auto mt-8 flex max-w-2xl items-start justify-center gap-2 text-center text-sm text-navy-200">
        <AppIcon name="info" :size="16" class="mt-0.5 shrink-0" />
        Natijalar har bir organizmda individual bo‘lib, teri holati va qo‘llash muntazamligiga bog‘liq.
      </p>

      <div v-reveal class="mt-8 flex justify-center">
        <BaseButton size="lg" icon="arrow-right" @click="scrollToForm">Men ham natija olmoqchiman</BaseButton>
      </div>
    </div>
  </section>
</template>
