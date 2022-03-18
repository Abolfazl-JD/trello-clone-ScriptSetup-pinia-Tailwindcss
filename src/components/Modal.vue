<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type {Task} from '../types'
import {boardColumns} from '../stores/board'

interface PropsType{
    task : Task,
    colIndex : number,
    taskIndex : number
}

const props = defineProps<PropsType>()

const emit = defineEmits<{
    (event : 'hide-modal') : void
}>()


const taskNameForm = ref<HTMLInputElement | null>(null)
onMounted(() => {
    taskNameForm.value?.focus()
})

const trelloBoard = boardColumns()
const editedTaskName = ref(props.task.name)

const editTaskName = () => {
    if(editedTaskName.value) 
    trelloBoard.editTaskName(props.colIndex, props.taskIndex, editedTaskName.value)
    else editedTaskName.value = props.task.name
}
</script>

<template>
    <div @click.self="emit('hide-modal')"
	    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-2/5 shadow-lg rounded-md bg-white">
	      <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block text-gray-700 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
            <h3 class="mb-1 font-extrabold text-gray-700 inline-block">Name</h3>
            <input 
                type="text" 
                class="w-full pl-3 py-3 mb-8 focus:outline-blue-500" 
                placeholder="enter task name ..."
                v-model="editedTaskName" 
                ref="taskNameForm"
                @change="editTaskName">

            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5 inline-block text-gray-700 mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                stroke-width="2">
                <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            <h3 class="mb-1 font-extrabold text-gray-700 inline-block">Description</h3>
            <textarea 
                ref="textarea"
                class="rounded w-full p-2 placeholder:text-sm shadow-gray-400 shadow mt-2 focus:outline-blue-500" 
                placeholder="Enter a description for this task..." 
                rows="3"/>
            <div class="items-center px-4 py-3">
                <!-- <button
                    @click="showModal = false"
                    class="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
                    OK
                </button> -->
            </div>
	    </div>
    </div>
  </div>
</template>