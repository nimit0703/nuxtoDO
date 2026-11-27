<script lang="ts" setup>
import type { BoardDocument } from "~/server/models/board.model";

const props = defineProps<{ board: BoardDocument }>();
const emit = defineEmits<{ (e: "edit"): void; (e: "deleted"): void }>();

const { destroy } = useBoard();

// Stable fallback gradient per board so cover-less boards still look intentional
const gradients = [
  "from-sky-400 to-blue-600",
  "from-violet-400 to-indigo-600",
  "from-emerald-400 to-teal-600",
  "from-amber-400 to-orange-600",
  "from-rose-400 to-pink-600",
  "from-slate-400 to-slate-600",
];
const gradient = computed(() => {
  const id = String(props.board._id);
  let sum = 0;
  for (const ch of id) sum += ch.charCodeAt(0);
  return gradients[sum % gradients.length];
});

const listCount = computed(() => props.board.lists?.length ?? 0);

const actions = [
  [{ label: "Edit board", icon: "i-heroicons-pencil-square", click: () => emit("edit") }],
  [
    {
      label: "Delete board",
      icon: "i-heroicons-trash",
      click: () => destroy(props.board._id, props.board.name, () => emit("deleted")),
    },
  ],
];
</script>

<template>
  <div
    class="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-br shadow-sm ring-1 ring-black/5 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] dark:ring-white/10"
    :class="gradient"
  >
    <img
      v-if="board.coverImage"
      :src="board.coverImage"
      :alt="''"
      loading="lazy"
      class="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

    <NuxtLink
      :to="{ name: 'boardId', params: { boardId: board._id } }"
      class="absolute inset-0 flex flex-col justify-end p-4 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
    >
      <span class="line-clamp-2 text-base font-semibold leading-snug tracking-tight">
        {{ board.name }}
      </span>
      <span class="mt-0.5 text-xs text-white/75">
        {{ listCount }} {{ listCount === 1 ? "list" : "lists" }}
      </span>
    </NuxtLink>

    <UDropdown :items="actions" class="absolute right-2 top-2">
      <button
        class="flex h-8 w-8 items-center justify-center rounded-full bg-black/25 text-white opacity-100 backdrop-blur-md transition hover:bg-black/40 focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
        :aria-label="`Options for ${board.name}`"
      >
        <UIcon name="i-heroicons-ellipsis-horizontal-20-solid" class="h-5 w-5" />
      </button>
    </UDropdown>
  </div>
</template>
