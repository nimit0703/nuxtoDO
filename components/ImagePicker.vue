<script setup lang="ts">
export interface PicsumImage {
  id: string;
  author: string;
}

defineProps<{ modelValue?: string | null }>();
const emit = defineEmits<{ (e: "update:modelValue", value: string | null): void }>();

const { data: images, pending, error } = useFetch<PicsumImage[]>(
  "https://picsum.photos/v2/list",
  { key: "cover-images", params: { page: 3, limit: 15 }, server: false, lazy: true }
);

// Store a sized URL instead of the multi-MB original
const coverUrl = (id: string) => `https://picsum.photos/id/${id}/1600/900`;
const thumbUrl = (id: string) => `https://picsum.photos/id/${id}/240/160`;
</script>

<template>
  <div role="radiogroup" aria-label="Cover image" class="grid grid-cols-4 gap-2 sm:grid-cols-4">
    <button
      type="button"
      role="radio"
      :aria-checked="!modelValue"
      class="flex aspect-[3/2] items-center justify-center rounded-lg bg-neutral-100 text-xs font-medium text-neutral-500 ring-offset-2 transition active:scale-95 dark:bg-neutral-800 dark:ring-offset-neutral-900"
      :class="!modelValue ? 'ring-2 ring-primary-500' : 'hover:bg-neutral-200 dark:hover:bg-neutral-700'"
      @click="emit('update:modelValue', null)"
    >
      None
    </button>

    <template v-if="pending">
      <div
        v-for="i in 7"
        :key="i"
        class="aspect-[3/2] animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800"
      />
    </template>

    <button
      v-for="image in images"
      :key="image.id"
      type="button"
      role="radio"
      :aria-checked="modelValue === coverUrl(image.id)"
      :aria-label="`Photo by ${image.author}`"
      class="relative aspect-[3/2] overflow-hidden rounded-lg ring-offset-2 transition active:scale-95 dark:ring-offset-neutral-900"
      :class="modelValue === coverUrl(image.id) ? 'ring-2 ring-primary-500' : 'hover:opacity-90'"
      @click="emit('update:modelValue', coverUrl(image.id))"
    >
      <img :src="thumbUrl(image.id)" alt="" loading="lazy" class="h-full w-full object-cover" />
    </button>
  </div>
  <p v-if="error" class="mt-2 text-xs text-neutral-500">
    Couldn’t load cover photos. You can add one later.
  </p>
</template>
