<script setup>
import { ref } from 'vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import ProductCard from '@/components/sections/ProductCard.vue'
import { products } from '@/data/content'

const steps = [
  { icon: 'heart', title: 'Ичдан', text: 'Сироп организмни тозалайди, асаб ва иммунитетни қўллаб-қувватлайди.' },
  { icon: 'leaf', title: 'Ташқаридан', text: 'Крем терини тинчлантиради, намлайди ва тикланишни фаоллаштиради.' },
  { icon: 'shield', title: 'Ҳар куни', text: 'Совун терини юмшоқ тозалайди ва ҳимоя пардасини сақлайди.' },
]

const openId = ref(products[0].id)
</script>

<template>
  <section id="dermolife" class="section">
    <div class="container-page">
      <SectionHeading
        eyebrow="Dermolife нима?"
        title="Тери учун 3 босқичли табиий комплекс"
        text="Dermolife Complex — терини фақат устидан эмас, балки ичдан ҳам парвариш қиладиган ёндашув. Бундай комплекс нафақат терини, балки бутун организмни уйғоқ ва соғлом ҳолатга келтиришга ёрдам беради."
      />

      <!-- qanday yechim beradi -->
      <div class="mb-12 grid gap-3 sm:grid-cols-3 sm:gap-4">
        <div
          v-for="(s, i) in steps"
          :key="s.title"
          v-reveal="i * 80"
          class="flex items-start gap-4 rounded-2xl bg-navy-700 p-5 text-white sm:flex-col sm:p-6"
        >
          <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-leaf-400">
            <AppIcon :name="s.icon" :size="22" />
          </span>
          <div>
            <p class="text-lg font-extrabold">{{ s.title }}</p>
            <p class="mt-1 text-[15px] leading-relaxed text-navy-100">{{ s.text }}</p>
          </div>
        </div>
      </div>

      <div class="grid items-start gap-5 lg:grid-cols-3">
        <ProductCard
          v-for="(p, i) in products"
          :key="p.id"
          v-reveal="i * 100"
          :product="p"
          :open="openId === p.id"
          @toggle="openId = openId === p.id ? null : p.id"
        />
      </div>
    </div>
  </section>
</template>
