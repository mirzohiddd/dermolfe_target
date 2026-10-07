<script setup>
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { advantages } from '@/data/content'
</script>

<template>
  <section id="afzalliklar" class="section">
    <div class="container-page">
      <SectionHeading eyebrow="Нега Dermolife?" title="Ишонч билан танлаш учун 6 та сабаб" />

      <div class="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-12">
        <div v-for="(a, i) in advantages" :key="a.title" v-reveal="(i % 3) * 80" class="flex gap-4">
          <span
            class="grid h-13 w-13 shrink-0 place-items-center rounded-2xl bg-white text-leaf-600 shadow-[var(--shadow-soft)] ring-1 ring-navy-100/70"
          >
            <AppIcon :name="a.icon" :size="24" />
          </span>
          <div>
            <h3 class="text-lg font-extrabold tracking-[-0.01em] text-navy-800">{{ a.title }}</h3>
            <p class="mt-1.5 leading-relaxed text-muted">{{ a.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
