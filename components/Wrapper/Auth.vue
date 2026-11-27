<script lang="ts" setup>
defineProps<{ title: string; subtitle?: string }>();
</script>

<template>
  <div
    class="flex min-h-[100dvh] items-center justify-center bg-gradient-to-b from-white to-neutral-100 px-4 py-12 dark:from-neutral-900 dark:to-neutral-950"
  >
    <div class="w-full max-w-sm">
      <div class="mb-8 text-center">
        <div
          class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500 text-white shadow-lg shadow-primary-500/25"
        >
          <UIcon name="i-heroicons-check-20-solid" class="h-8 w-8" />
        </div>
        <h1 class="text-2xl font-semibold leading-tight">{{ title }}</h1>
        <p v-if="subtitle" class="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
          {{ subtitle }}
        </p>
      </div>

      <UCard :ui="{ body: { padding: 'p-6' } }">
        <slot />
      </UCard>

      <p class="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
        <slot name="footer" />
      </p>
    </div>
  </div>
</template>
