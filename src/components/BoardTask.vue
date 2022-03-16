<script setup lang="ts">
import type {Task} from '../types'

interface propsType{
    task : Task,
    taskIndex : number
}

const props = defineProps<propsType>()

</script>

<template>
    <div class="bg-white px-2 pb-[5px] pt-2 rounded flex justify-between group mt-2 shadow shadow-gray-400">
        <p class="text-sm">{{ props.task.name }}</p>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 hidden group-hover:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
    </div>
</template>

