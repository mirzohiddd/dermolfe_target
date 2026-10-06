<script setup>
import specialistImg from '@/assets/images/specialist.webp'
import syrupImg from '@/assets/images/product-syrup.webp'
import creamImg from '@/assets/images/product-cream.webp'
import soapImg from '@/assets/images/product-soap.webp'
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { scrollToForm, scrollToSection } from '@/composables/useScrollTo'
import { results } from '@/data/content'

const points = ['Tabiiy tarkib', 'Ichdan va tashqaridan ta’sir', 'Mutaxassis maslahati']
</script>

<template>
  <section id="top" class="relative overflow-hidden pt-24 pb-14 sm:pt-28 lg:pt-32 lg:pb-24">
    <!-- fon -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10">
      <div class="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-leaf-100/70 blur-3xl" />
      <div class="absolute top-1/3 -left-48 h-[420px] w-[420px] rounded-full bg-navy-100/60 blur-3xl" />
    </div>

    <div class="container-page grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
      <div class="hero-in">
        <p
          class="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-bold text-navy-700 shadow-[var(--shadow-soft)] ring-1 ring-navy-100"
        >
          <span class="h-2 w-2 rounded-full bg-leaf-500" />
          Psoriaz · Ekzema · Allergik toshmalar
        </p>

        <h1
          class="mt-5 text-[34px] leading-[1.08] font-extrabold tracking-[-0.035em] text-navy-800 text-balance sm:text-5xl lg:text-[58px]"
        >
          Teringizni <span class="text-leaf-600">ichdan va tashqaridan</span> tabiiy tiklang
        </h1>

        <p class="mt-5 max-w-xl text-[17px] leading-relaxed text-muted sm:text-lg">
          <strong class="font-bold text-navy-700">Dermolife Complex</strong> — sirop, krem va sovundan iborat tabiiy
          kompleks. Mutaxassisdan konsultatsiya oling va teringizga mos parvarishni bilib oling.
        </p>

        <ul class="mt-6 flex flex-wrap gap-x-5 gap-y-2.5">
          <li v-for="p in points" :key="p" class="flex items-center gap-2 text-[15px] font-semibold text-navy-800">
            <span class="grid h-5 w-5 place-items-center rounded-full bg-leaf-600 text-white">
              <AppIcon name="check" :size="13" :stroke-width="3" />
            </span>
            {{ p }}
          </li>
        </ul>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <BaseButton size="lg" icon="arrow-right" @click="scrollToForm">Konsultatsiya olish</BaseButton>
          <BaseButton size="lg" variant="secondary" @click="scrollToSection('natijalar')">
            Natijalarni ko‘rish
          </BaseButton>
        </div>
      </div>

      <!-- vizual -->
      <div class="hero-in relative mx-auto w-full max-w-md lg:max-w-none" style="--d: 120ms">
        <div
          class="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-gradient-to-br from-navy-700 to-navy-900 shadow-[var(--shadow-lift)]"
        >
          <img
            :src="specialistImg"
            alt="Dermolife mutaxassisi"
            width="900"
            height="1347"
            fetchpriority="high"
            decoding="async"
            class="h-full w-full object-cover object-[50%_18%]"
          />
          <div class="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy-900/70 to-transparent" />
          <div class="absolute bottom-12 left-4 text-white sm:bottom-14 sm:left-6">
            <p class="text-xs font-semibold tracking-wider text-leaf-100 uppercase">Shaxsiy konsultatsiya</p>
            <p class="text-lg font-bold">Dermolife mutaxassisi</p>
          </div>
        </div>

        <!-- kompleks kartochkasi -->
        <div
          class="absolute -right-2 -bottom-6 flex items-center gap-3 rounded-2xl bg-white p-2.5 pr-4 shadow-[var(--shadow-lift)] ring-1 ring-navy-100/60 sm:-right-6"
        >
          <div class="flex -space-x-3">
            <img
              v-for="(src, i) in [syrupImg, creamImg, soapImg]"
              :key="i"
              :src="src"
              alt=""
              width="48"
              height="48"
              class="h-12 w-12 rounded-xl object-cover ring-2 ring-white"
            />
          </div>
          <div class="leading-tight">
            <p class="text-sm font-extrabold text-navy-800">3 bosqichli kompleks</p>
            <p class="text-xs font-medium text-muted">Sirop · Krem · Sovun</p>
          </div>
        </div>

        <!-- natijalar chipi -->
        <button
          type="button"
          class="absolute top-5 -left-2 flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 shadow-[var(--shadow-lift)] ring-1 ring-navy-100/60 transition hover:-translate-y-0.5 sm:-left-6"
          @click="scrollToSection('natijalar')"
        >
          <span class="grid h-8 w-8 place-items-center rounded-lg bg-leaf-50 text-leaf-600">
            <AppIcon name="sparkles" :size="18" />
          </span>
          <span class="text-left leading-tight">
            <span class="block text-sm font-extrabold text-navy-800">{{ results.length }} ta real natija</span>
            <span class="block text-xs font-medium text-muted">oldin / keyin</span>
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-in {
  animation: hero-in 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  animation-delay: var(--d, 0ms);
}
@keyframes hero-in {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
}
</style>
