<template>
  <WrapperDefault>
    <template #actions>
      <UButton size="xs" @click="showListCreate = true">Create list</UButton>
    </template>
    <USlideover v-model="showListCreate">
      <OverlayHeader
        :title="slelectedList ? 'Update list' : 'Create list'"
        :onClick="() => (showListCreate = false)"
      ></OverlayHeader>
      <FormList
        type="create"
        :board-id="(boardId as string)"
        :on-create="
          () => {
            refresh();
            showListCreate = false;
          }
        "
        :on-update="
          () => {
            refresh();
            showListCreate = false;
          }
        "
        class="p-4"
      />
    </USlideover>

    {{ data }}
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

const showListCreate = ref(false);
const slelectedList = ref<ListDocument | undefined>();
</script>

<style scoped></style>
