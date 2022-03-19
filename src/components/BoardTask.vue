<script setup lang="ts">
import { ref } from 'vue'
import type {Task} from '../types'
import {boardColumns} from '../stores/board'
import EditModal from './Modal.vue'

interface propsType{
    task : Task,
    taskIndex : number,
    colIndex : number
}

const props = defineProps<propsType>()

const showModal = ref(false)

const trelloBoard = boardColumns()
const toggleCheckTask = () => {
    trelloBoard.toggleCheckTask(props.task)
}

</script>

<template>
    <div class="bg-white px-2 pb-[5px] pt-2 rounded mt-2 shadow shadow-gray-400">
        <div class="flex justify-between group"  @click="showModal = true">
            <p class="text-sm">{{ task.name }}</p>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 hidden group-hover:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
        </div>
        <div class="flex gap-1 place-items-center">
            <div 
                v-show="task.date" 
                class="flex text-xs mt-1 p-1 w-fit rounded-lg place-items-center gap-1 group"
                :class="task.completed ? 'bg-green-500 text-white hover:bg-green-600' : 'text-gray-500 hover:bg-gray-200'"
                @click="toggleCheckTask">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="h-auto w-4 group-hover:hidden" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    stroke-width="2">
                    <path 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div class="hidden group-hover:block">
                    <div v-if="!task.completed" class="h-3 w-3 bg-transparent border-2 border-solid border-gray-400 rounded-sm"></div>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-auto w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <p>{{task.date}} * {{task.time}}</p>
            </div>
            <svg 
                v-if="task.description"
                @click="showModal = true"
                xmlns="http://www.w3.org/2000/svg" 
                class="h-4 w-4 text-gray-900" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                stroke-width="2">
                <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    d="M4 6h16M4 12h16M4 18h7" />
            </svg>
        </div>
    </div>

    <!-- Modal -->
    <EditModal 
        v-if="showModal"
        :task="task"
        @hide-modal="showModal = false"
        :colIndex="colIndex"
    />
</template>

