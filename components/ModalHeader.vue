<script lang="ts" setup>
defineProps<{ title: string }>();
defineEmits<{ (e: "close"): void }>();
</script>

<template>
  <div class="mb-5 flex items-center justify-between gap-4">
    <h2 class="text-lg font-semibold">{{ title }}</h2>
    <UButton
      color="gray"
      variant="soft"
      icon="i-heroicons-x-mark-20-solid"
      size="xs"
      class="rounded-full"
      aria-label="Close"
      @click="$emit('close')"
    />
  </div>
</template>
