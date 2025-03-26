<template>
  <WrapperDefault v-if="data" class="h-screen" :style="{
    backgroundImage: `url(${data.coverImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }">
    <template #actions>
      <UButton size="xs" @click="showListCreate = true">Create list</UButton>
    </template>
    <h1 class="tetx-3xl font-semibold mb-4 inline-block">{{ data.name }}</h1>

    <ListContainer :lists="data.lists" :board-id="boardId"/>


    <USlideover v-model="showListCreate">
      <OverlayHeader :title="slelectedList ? 'Update list' : 'Create list'" :onClick="() => (showListCreate = false)">
      </OverlayHeader>
      <FormList type="create" :board-id="(boardId as string)" :on-create="() => {
          refresh();
          showListCreate = false;
        }
        " :on-update="() => {
            refresh();
            showListCreate = false;
          }
          " class="p-4" />
    </USlideover>

  </WrapperDefault>
</template>

<script setup lang="ts">
import type { BoardDocument } from "~/server/models/board.model";
import type { ListDocument } from "~/server/models/List.model";

const route = useRoute();

const { boardId } = route.params;

const { data, refresh } = await useFetch<BoardDocument[]>(
  `/api/boards/${boardId}`
);
if (!data.value) {
  throw createError({
    statusCode: 404,
    message: "Board not found"
  })
}
const showListCreate = ref(false);
const slelectedList = ref<ListDocument | undefined>();
</script>

<style scoped></style>
