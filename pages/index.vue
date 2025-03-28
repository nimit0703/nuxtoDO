<script lang="ts" setup>
import type { BoardDocument } from "~/server/models/board.model";

definePageMeta({
  middleware: "auth",
});

useHead({
  title: "Boards",
});

const showCreateBoard = ref(false);
const selectedBoard = ref<BoardDocument | undefined>();

const { data, error, refresh } = await useFetch<BoardDocument[]>("/api/boards");
const { data:imagesData } = await useFetch<any[]>('https://picsum.photos/v2/list', {
  params: {
      page: 3,
      limit: 16
  }
})
provide("refresh-boards", refresh);

if (error.value) {
  throw createError(error.value);
}

async function handleEdit(board: BoardDocument) {
  selectedBoard.value = board;
  showCreateBoard.value = true;
}

watchEffect(() => {
  if (!showCreateBoard.value) {
    selectedBoard.value = undefined;
  }
});
</script>
<template>
  <WrapperDefault>
    <h1 class="tex-3xl font-semibold">Boards</h1>

    <template #actions>
      <UButton size="xs" @click="showCreateBoard = !showCreateBoard">Create new board</UButton>
    </template>

    <!-- Sidesheet  -->
    <USlideover v-model="showCreateBoard">
      <SlideoverHeader :title="selectedBoard ? 'Update board' : 'Create board'"
        :on-click="() => (showCreateBoard = false)">
      </SlideoverHeader>

      <FormBoard :type="selectedBoard ? 'update' : 'create'" :initial-data="selectedBoard" :imagesData="imagesData" :on-create="() => {
        showCreateBoard = false;
        refresh();
      }
        " :on-update="() => {
          showCreateBoard = false;
          selectedBoard = undefined;
          refresh();
        }
          " />
    </USlideover>
    <!-- ./ Sidesheet  -->

    <!-- List of boards -->
    <section class="grid grid-cols-2 lg:grid-cols-5 my-4 gap-4">
      <!-- {{ data }} -->
      <div class="border custom-dashed-border border-primary-400 bg-primary-400 bg-opacity-10 hover:bg-opacity-20 rounded-lg h-36 w-full flex items-center justify-center
          cursor-pointer transition ease-in-out text-primary-400"
        @click="showCreateBoard = !showCreateBoard">
        <UIcon name="i-heroicons-document-plus-solid" class="text-4xl"></UIcon>
        <p class="m-2 font-bold">Create list</p>
      </div>
      <BoardCard v-for="board in data" :key="board._id" :board="board" :onEdit="handleEdit"></BoardCard>
    </section>
    <!-- ./ List of boards -->
  </WrapperDefault>
</template>

<style>
.custom-dashed-border {
    border-style: dashed;
    border-width: 2px;
    stroke-dasharray: 30 20;
}
</style>