<script lang="ts" setup>
import draggable from "vuedraggable";
import type { CardDocument } from "~/server/models/Card.model";
import type { ListDocument } from "~/server/models/List.model";

const props = defineProps<{ list: ListDocument; boardId: string }>();

const { destroy, update } = useList();
const { update: updateCard } = useCard();
const refreshBoard = inject("refresh-board") as () => void;

const { data: cards, refresh } = await useFetch<CardDocument[]>(
  `/api/lists/${props.list._id}/cards`
);

const showCard = ref(false);
const selectedCard = ref<CardDocument>();
const showRename = ref(false);

function openCard(card?: CardDocument) {
  selectedCard.value = card;
  showCard.value = true;
}

const listActions = [
  [
    { label: "Add card", icon: "i-heroicons-plus", click: () => openCard() },
    { label: "Rename", icon: "i-heroicons-pencil-square", click: () => (showRename.value = true) },
  ],
  [
    {
      label: "Delete list",
      icon: "i-heroicons-trash",
      click: () => destroy(props.list._id, props.list.name, refreshBoard),
    },
  ],
];

async function handleCardChange(e: any) {
  try {
    if (e.added) {
      await updateCard(props.list._id, e.added.element._id, { list: props.list._id });
    }
    await update(props.list._id, { cards: cards.value?.map((c) => c._id) });
  } catch (err) {
    toastError(err);
    refresh();
  }
}

function onCardSaved() {
  showCard.value = false;
  refresh();
}
</script>

<template>
  <section
    class="glass flex max-h-full w-[85vw] max-w-[18rem] flex-none snap-center flex-col rounded-2xl bg-neutral-100/90 shadow-sm ring-1 ring-black/5 backdrop-blur-xl sm:w-72 dark:bg-neutral-900/85 dark:ring-white/10"
    :aria-label="list.name"
  >
    <header class="list-handle flex cursor-grab items-center gap-2 px-3 pb-1 pt-3 active:cursor-grabbing">
      <h2 class="truncate text-sm font-semibold">{{ list.name }}</h2>
      <span
        class="rounded-full bg-neutral-200 px-1.5 text-xs font-medium tabular-nums text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
      >
        {{ cards?.length ?? 0 }}
      </span>
      <UDropdown :items="listActions" class="ml-auto">
        <UButton
          color="gray"
          variant="ghost"
          size="xs"
          icon="i-heroicons-ellipsis-horizontal-20-solid"
          :aria-label="`Options for ${list.name}`"
        />
      </UDropdown>
    </header>

    <draggable
      v-if="cards"
      :list="cards"
      item-key="_id"
      group="cards"
      :animation="180"
      :scroll-sensitivity="200"
      :force-fallback="true"
      ghost-class="ghost-card"
      drag-class="dragging-card"
      class="min-h-[3rem] flex-1 space-y-2 overflow-y-auto px-2 py-2"
      @change="handleCardChange"
    >
      <template #item="{ element }">
        <div>
          <ListCard :card="element" @click="openCard(element)" />
        </div>
      </template>
    </draggable>

    <footer class="p-2 pt-0">
      <UButton
        block
        color="gray"
        variant="ghost"
        icon="i-heroicons-plus"
        class="justify-start"
        @click="openCard()"
      >
        Add a card
      </UButton>
    </footer>

    <UModal v-model="showCard" :ui="{ width: 'sm:max-w-xl' }">
      <div class="p-6">
        <ModalHeader :title="selectedCard ? 'Edit card' : `New card in ${list.name}`" @close="showCard = false" />
        <FormCard
          :key="selectedCard?._id ?? 'new'"
          :list-id="list._id"
          :initial-data="selectedCard"
          @saved="onCardSaved"
        />
      </div>
    </UModal>

    <UModal v-model="showRename" :ui="{ width: 'sm:max-w-sm' }">
      <div class="p-6">
        <ModalHeader title="Rename list" @close="showRename = false" />
        <FormList
          :board-id="boardId"
          :initial-data="list"
          @saved="
            showRename = false;
            refreshBoard();
          "
        />
      </div>
    </UModal>
  </section>
</template>

<style>
.ghost-card > * {
  @apply rounded-xl bg-neutral-300/50 dark:bg-neutral-700/50;
}
.ghost-card > * > * {
  @apply invisible;
}
.dragging-card {
  @apply rotate-2 shadow-xl;
}
</style>
