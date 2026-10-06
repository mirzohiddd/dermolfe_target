<script setup>
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { problems } from '@/data/content'
import { scrollToForm } from '@/composables/useScrollTo'
</script>

<template>
  <section id="muammolar" class="section bg-white">
    <div class="container-page">
      <SectionHeading
        eyebrow="Muammolar"
        title="Sizni ham shu muammolar bezovta qilyaptimi?"
        text="Teri muammolari ko‘pincha faqat tashqi emas — ular organizm ichidagi jarayonlar, stress va immunitet bilan bog‘liq."
      />

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        <article
          v-for="(item, i) in problems"
          :key="item.value"
          v-reveal="(i % 3) * 80"
          class="group rounded-3xl border border-navy-100/70 bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-leaf-100 hover:bg-white hover:shadow-[var(--shadow-lift)]"
        >
          <div
            class="grid h-12 w-12 place-items-center rounded-2xl bg-white text-navy-700 shadow-[var(--shadow-soft)] transition group-hover:bg-leaf-600 group-hover:text-white"
          >
            <AppIcon :name="item.icon" :size="24" />
          </div>
          <h3 class="mt-5 text-lg font-extrabold tracking-[-0.01em] text-navy-800">{{ item.title }}</h3>
          <p class="mt-2 leading-relaxed text-muted">{{ item.text }}</p>
        </article>
      </div>

      <div v-reveal class="mt-10 flex flex-col items-center gap-3 text-center">
        <p class="font-semibold text-navy-800">Muammongizni mutaxassisga ayting — sizga mos yo‘lni tushuntiramiz.</p>
        <BaseButton size="lg" icon="arrow-right" @click="scrollToForm">Konsultatsiya olish</BaseButton>
      </div>
    </div>
  </section>
</template>
