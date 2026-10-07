<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'

defineProps({
  product: { type: Object, required: true },
  open: { type: Boolean, default: false },
})
defineEmits(['toggle'])
</script>

<template>
  <article
    class="flex flex-col overflow-hidden rounded-3xl bg-white shadow-[var(--shadow-soft)] ring-1 ring-navy-100/60 transition duration-300 hover:shadow-[var(--shadow-lift)]"
  >
    <div class="relative aspect-[4/5] max-h-[400px] w-full overflow-hidden bg-leaf-50 lg:max-h-none">
      <img
        :src="product.image"
        :alt="`${product.name} ${product.volume}`"
        loading="lazy"
        decoding="async"
        width="560"
        height="700"
        class="h-full w-full object-cover"
      />
      <span
        class="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold text-navy-700 backdrop-blur"
      >
        {{ product.step }} · {{ product.role }}
      </span>
    </div>

    <div class="flex flex-1 flex-col p-6">
      <div class="flex items-baseline justify-between gap-3">
        <h3 class="text-xl font-extrabold tracking-[-0.01em] text-navy-800">{{ product.name }}</h3>
        <span class="shrink-0 rounded-lg bg-navy-50 px-2 py-0.5 text-sm font-bold text-navy-700">{{ product.volume }}</span>
      </div>
      <p class="mt-0.5 text-sm font-semibold text-leaf-600">{{ product.subname }}</p>
      <p class="mt-3 leading-relaxed text-muted">{{ product.lead }}</p>

      <button
        type="button"
        class="mt-5 flex items-center justify-between rounded-xl border border-navy-100 px-4 py-3 text-left text-[15px] font-bold text-navy-800 transition hover:border-leaf-400 hover:bg-leaf-50"
        :aria-expanded="open"
        :aria-controls="`ingr-${product.id}`"
        @click="$emit('toggle')"
      >
        Таркиби ({{ product.ingredients.length }})
        <AppIcon name="chevron-down" :size="20" class="transition-transform duration-300" :class="open && 'rotate-180'" />
      </button>

      <div
        :id="`ingr-${product.id}`"
        class="grid transition-[grid-template-rows] duration-300 ease-out"
        :class="open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
      >
        <ul class="space-y-2.5 overflow-hidden" :class="open && 'pt-4'">
          <li v-for="ing in product.ingredients" :key="ing.name" class="flex gap-2.5 text-[15px] leading-snug">
            <AppIcon name="leaf" :size="17" class="mt-0.5 shrink-0 text-leaf-600" />
            <span>
              <strong class="font-bold text-navy-800">{{ ing.name }}</strong>
              <span class="text-muted"> — {{ ing.text }}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>
