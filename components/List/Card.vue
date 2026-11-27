<script lang="ts" setup>
import type { CardDocument } from "~/server/models/Card.model";

const props = defineProps<{ card: CardDocument }>();

// Quill leaves "<p><br></p>" when cleared
const hasNotes = computed(() => !!props.card.description?.replace(/<[^>]*>/g, "").trim());
</script>

<template>
  <button
    type="button"
    class="block w-full cursor-grab rounded-xl bg-white p-3 text-left text-sm shadow-sm ring-1 ring-black/5 transition hover:ring-primary-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 active:cursor-grabbing dark:bg-neutral-800 dark:ring-white/10 dark:hover:ring-primary-400/60"
  >
    <span class="break-words leading-snug">{{ card.title }}</span>
    <span v-if="hasNotes" class="mt-2 flex items-center text-neutral-400" aria-label="Has notes">
      <UIcon name="i-heroicons-bars-3-bottom-left" class="h-4 w-4" />
    </span>
  </button>
</template>
