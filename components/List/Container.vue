<script lang="ts" setup>
import draggable from "vuedraggable";
import type { ListDocument } from "~/server/models/List.model";

const props = defineProps<{ boardId: string; lists: ListDocument[]; immersive?: boolean }>();

const refreshBoard = inject("refresh-board") as () => void;
const adding = ref(false);

async function handleSort() {
  try {
    await $fetch(`/api/boards/${props.boardId}`, {
      method: "PUT",
      body: { lists: props.lists.map((l) => l._id) },
    });
  } catch (e) {
    toastError(e);
    refreshBoard();
  }
}
</script>

<template>
  <div
    class="flex min-h-0 flex-1 items-start snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-4 py-4 sm:snap-none sm:gap-4 sm:px-6 lg:px-8"
  >
    <draggable
      :list="lists"
      handle=".list-handle"
      ghost-class="ghost-list"
      drag-class="dragging-list"
      item-key="_id"
      :animation="180"
      :scroll-sensitivity="200"
      :force-fallback="true"
      class="flex items-start gap-3 self-stretch sm:gap-4"
      @sort="handleSort"
    >
      <template #item="{ element }">
        <ListItem :list="element" :board-id="boardId" />
      </template>
    </draggable>

    <!-- Add list column -->
    <div class="w-[85vw] max-w-[18rem] flex-none snap-center sm:w-72">
      <div
        v-if="adding"
        class="glass rounded-2xl bg-neutral-100/90 p-3 shadow-sm ring-1 ring-black/5 backdrop-blur-xl dark:bg-neutral-900/85 dark:ring-white/10"
      >
        <FormList
          :board-id="boardId"
          @saved="refreshBoard()"
          @cancel="adding = false"
        />
      </div>
      <button
        v-else
        class="flex w-full items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition active:scale-[0.98]"
        :class="
          immersive
            ? 'bg-white/15 text-white backdrop-blur-md hover:bg-white/25'
            : 'bg-neutral-200/60 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800/60 dark:text-neutral-300 dark:hover:bg-neutral-800'
        "
        @click="adding = true"
      >
        <UIcon name="i-heroicons-plus" class="h-5 w-5" />
        {{ lists.length ? "Add another list" : "Add a list" }}
      </button>
    </div>
  </div>
</template>

<style>
.ghost-list {
  @apply opacity-40;
}
.dragging-list {
  @apply rotate-1 shadow-2xl;
}
</style>
