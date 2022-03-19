<script setup lang="ts">
import { ref } from 'vue'
import type {Task} from '../types'
import EditModal from './Modal.vue'

interface propsType{
    task : Task,
    taskIndex : number,
}

const props = defineProps<propsType>()

const showModal = ref(false)

const check = () => {
    console.log('checked')
}

</script>

<template>
    <div class="bg-white px-2 pb-[5px] pt-2 rounded group mt-2 shadow shadow-gray-400">
        <div class="flex justify-between"  @click="showModal = true">
            <p class="text-sm">{{ task.name }}</p>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 hidden group-hover:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
        </div>
        <div v-show="task.date " class="flex text-xs mt-1 py-1 w-fit pr-1 rounded-lg text-gray-500 gap-1 group hover:bg-gray-200">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-auto w-3 group-hover:hidden" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                stroke-width="2">
                <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <input type="checkbox" class="hidden form-checkbox h-auto bg-gray-700 group-hover:block" @change="check">
            <p>{{task.date}} * {{task.time}}</p>
        </div>
    </div>

    <!-- Modal -->
    <EditModal 
        v-if="showModal"
        :task="task"
        @hide-modal="showModal = false"
    />
</template>

