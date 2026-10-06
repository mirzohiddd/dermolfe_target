<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  text: { type: String, default: '' },
  align: { type: String, default: 'center' }, // center | left
  dark: { type: Boolean, default: false },
})
</script>

<template>
  <div
    v-reveal
    class="mb-10 sm:mb-14"
    :class="align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'"
  >
    <p
      v-if="eyebrow"
      class="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]"
      :class="dark ? 'text-leaf-400' : 'text-leaf-600'"
    >
      <span class="h-px w-6" :class="dark ? 'bg-leaf-400' : 'bg-leaf-600'" />
      {{ eyebrow }}
    </p>
    <h2
      class="text-[28px] leading-[1.15] font-extrabold tracking-[-0.025em] text-balance sm:text-4xl lg:text-[44px]"
      :class="dark ? 'text-white' : 'text-navy-800'"
    >
      {{ title }}
    </h2>
    <p
      v-if="text"
      class="mt-4 text-base leading-relaxed text-pretty sm:text-lg"
      :class="dark ? 'text-navy-100' : 'text-muted'"
    >
      {{ text }}
    </p>
  </div>
</template>
