<script lang="ts" setup>
import type { CardDocument } from "~/server/models/Card.model";

interface Props {
  card: CardDocument;
}

const props = defineProps<Props>();
</script>
<template>
  <div
    class="p-2 border rounded-lg text-sm bg-white dark:bg-gray-800 dark:border-gray-700 cursor-grab hover:!border-primary-300 dark:hover:!border-primary-700"
  >
    {{ card.title }}
  </div>
</template>

<style></style>