<template>
    <ol v-if="imagesData" class="grid grid-cols-4 gap-2 overflow-y-auto overflow-x-auto h-64 p-2">
        <li v-for="image in imagesData"
            class="h-12 relative rounded overflow-hidden cursor-pointer outline outline-transparent focus:outline-blue-500 hover:outline-blue-500"
            :class="{
                'ring-2 ring-blue-500 shadow': modelValue === image.download_url,
            }" :key="image.id" @click="$emit('update:modelValue', image.download_url)">
            <NuxtImg :src="image.download_url + '?w=150&h=150&fit=crop'" class="w-full h-full absolute object-cover"></NuxtImg>
        </li>
    </ol>
</template>

<script setup lang="ts">

defineProps<{
    modelValue?: string,
    imagesData:[any]
}>()

defineEmits<{
    (e: "update:modelValue", value: string): void
}>();
</script>