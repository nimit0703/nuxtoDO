<script lang="ts" setup>
import type { BoardDocument } from "~/server/models/board.model";
import type { ListDocument } from "~/server/models/List.model";

definePageMeta({ middleware: "auth" });

const boardId = useRoute().params.boardId as string;
const { data, refresh } = await useFetch<BoardDocument>(`/api/boards/${boardId}`);

if (!data.value) {
  throw createError({ statusCode: 404, message: "Board not found", fatal: true });
}

provide("refresh-board", refresh);
useHead({ title: () => data.value?.name ?? "Board" });

const lists = computed(() => (data.value?.lists ?? []) as ListDocument[]);
const cover = computed(() => data.value?.coverImage);
</script>

<template>
  <div class="relative">
    <!-- Cover sits behind everything; dimmed so frosted lists stay legible -->
    <div
      v-if="cover"
      class="fixed inset-0 -z-10 bg-cover bg-center"
      :style="{ backgroundImage: `url(${cover})` }"
    >
      <div class="absolute inset-0 bg-black/40" />
    </div>

    <WrapperDefault v-if="data" :immersive="!!cover" class="h-[100dvh] overflow-hidden">
      <template #title>
        <div class="flex min-w-0 items-center gap-1">
          <UButton
            to="/"
            color="gray"
            variant="ghost"
            icon="i-heroicons-chevron-left-20-solid"
            :class="cover && '!text-white hover:!bg-white/10'"
            aria-label="All boards"
          />
          <h1 class="truncate text-base font-semibold sm:text-lg">{{ data.name }}</h1>
        </div>
      </template>

      <ListContainer :lists="lists" :board-id="boardId" :immersive="!!cover" />
    </WrapperDefault>
  </div>
</template>
