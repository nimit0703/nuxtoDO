<script lang="ts" setup>
import type { BoardDocument } from "~/server/models/board.model";

definePageMeta({ middleware: "auth" });
useHead({ title: "Boards" });

const { data: boards, error, refresh } = await useFetch<BoardDocument[]>("/api/boards");
if (error.value) throw createError(error.value);

const query = ref("");
const searchInput = ref();
const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return (boards.value ?? []).filter((b) => b.name.toLowerCase().includes(q));
});

const showForm = ref(false);
const editing = ref<BoardDocument>();

function openForm(board?: BoardDocument) {
  editing.value = board;
  showForm.value = true;
}

function onSaved() {
  showForm.value = false;
  refresh();
}

defineShortcuts({
  n: { handler: () => openForm() },
  "/": { handler: () => searchInput.value?.input?.focus() },
});
</script>

<template>
  <WrapperDefault>
    <template #actions>
      <UButton icon="i-heroicons-plus" class="hidden sm:flex" @click="openForm()">
        New board
      </UButton>
    </template>

    <UContainer class="w-full py-8 sm:py-12">
      <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 class="text-3xl font-bold leading-tight sm:text-4xl">Boards</h1>
          <p class="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {{ boards?.length ?? 0 }} {{ boards?.length === 1 ? "board" : "boards" }}
          </p>
        </div>
        <UInput
          v-if="boards?.length"
          ref="searchInput"
          v-model="query"
          icon="i-heroicons-magnifying-glass"
          placeholder="Search boards"
          aria-label="Search boards"
          class="w-full sm:w-64"
          :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <UKbd v-if="!query" class="hidden sm:inline-flex">/</UKbd>
            <UButton
              v-else
              color="gray"
              variant="link"
              icon="i-heroicons-x-mark-20-solid"
              :padded="false"
              aria-label="Clear search"
              @click="query = ''"
            />
          </template>
        </UInput>
      </div>

      <!-- Empty: no boards yet -->
      <div
        v-if="!boards?.length"
        class="flex flex-col items-center rounded-3xl border border-dashed border-neutral-300 px-6 py-20 text-center dark:border-neutral-700"
      >
        <div
          class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-500 dark:bg-primary-500/10"
        >
          <UIcon name="i-heroicons-squares-2x2" class="h-7 w-7" />
        </div>
        <h2 class="text-lg font-semibold">Create your first board</h2>
        <p class="mt-1 max-w-xs text-sm text-neutral-500 dark:text-neutral-400">
          Boards hold lists, and lists hold cards. Start with a project, a trip, or this week.
        </p>
        <UButton class="mt-6" size="lg" icon="i-heroicons-plus" @click="openForm()">
          New board
        </UButton>
      </div>

      <!-- Empty: search miss -->
      <div v-else-if="!filtered.length" class="py-20 text-center">
        <p class="font-medium">No boards match “{{ query }}”</p>
        <UButton class="mt-2" variant="link" @click="query = ''">Clear search</UButton>
      </div>

      <section v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        <BoardCard
          v-for="board in filtered"
          :key="board._id"
          :board="board"
          @edit="openForm(board)"
          @deleted="refresh()"
        />
        <button
          v-if="!query"
          class="flex aspect-[16/10] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-neutral-300 text-sm font-medium text-neutral-500 transition hover:border-primary-400 hover:bg-primary-50/50 hover:text-primary-500 active:scale-[0.98] dark:border-neutral-700 dark:hover:bg-primary-500/5"
          @click="openForm()"
        >
          <UIcon name="i-heroicons-plus" class="h-6 w-6" />
          New board
          <UKbd class="hidden sm:inline-flex">N</UKbd>
        </button>
      </section>
    </UContainer>

    <!-- Mobile primary action -->
    <UButton
      icon="i-heroicons-plus"
      size="xl"
      class="fixed bottom-6 right-6 rounded-full shadow-lg shadow-primary-500/30 sm:hidden"
      aria-label="New board"
      @click="openForm()"
    />

    <UModal v-model="showForm">
      <div class="p-6">
        <ModalHeader :title="editing ? 'Edit board' : 'New board'" @close="showForm = false" />
        <FormBoard :key="editing?._id ?? 'new'" :initial-data="editing" @saved="onSaved" />
      </div>
    </UModal>
  </WrapperDefault>
</template>
