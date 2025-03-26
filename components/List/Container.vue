<template>
    <div>
        <draggable :list="lists" class="flex gap-4 h-[80vh]">
            <template #item="{ element }">
                <div class="flex">
                    <div class="w-72 shadow flex-none bg-white dark:bg-gray-800 rounded-lg flex flex-col">
                        <!-- header -->
                        <div class="p-2 border-b dark:border-gray-700 flex items-center justify-between">
                            <h3 class="font-medium">
                                {{ element.name }}
                            </h3>
                            <UDropdown :items="listAction">
                                <UIcon name="i-heroicons-cog-6-tooth"></UIcon>
                            </UDropdown>
                        </div>
                        <!-- /header -->
                         <!-- body -->
                          <div class="list-body p-2 flex-1 overflow-y-hidden">

                          </div>
                         <!-- /body -->
                        <!-- Footer -->
                         <div class="p-1 border-t dark:bg-gray-800 flex items-center">
                            <UButton block> Add card</UButton>
                         </div>
                        <!-- /Footer -->
                    </div>
                </div>
            </template>
        </draggable>
    </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
interface Props {
    lists: ListDocument[],
    boardId: string,
}

defineProps<Props>();

const listAction = ref([
    [
        {
            label: 'Add card',
            icon: 'i-heroicons-plus-circle'
        },
        {
            label: 'Delete card',
            icon: 'i-heroicons-trash'
        },
    ]
])
</script>

<style scoped></style>