<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type {Task, SentTask} from '../types'

import {boardColumns} from '../stores/board'
const trelloBoard = boardColumns()

interface PropsType{
    task : Task,
    colIndex : number
}

const props = defineProps<PropsType>()

const emit = defineEmits<{
    (event : 'hide-modal') : void
}>()


const taskNameForm = ref<HTMLInputElement | null>(null)
onMounted(() => {
    // focus on task name input form
    taskNameForm.value?.focus()
})

// form 
const editedTaskName = ref(props.task.name)
const taskDescription = ref(props.task.description)
const taskDate = ref(props.task.date)
const taskTime = ref(props.task.time)
const taskDone = ref(props.task.completed)

const changeTask = () => {
    // if task name input form wasn't empty
    if(editedTaskName.value){
        const newTask: SentTask = {
            description: taskDescription.value,
            name: editedTaskName.value,
            date: taskDate.value,
            time: taskTime.value,
            completed : taskDone.value,
        }
        trelloBoard.editTask(props.task, newTask)
        // close the modal
        emit('hide-modal')
    }
    else taskNameForm.value?.focus()
}

const deleteTask = () => {
    trelloBoard.archiveTask(props.task, props.colIndex)
}
</script>

<template>
    <div 
        @click.self="changeTask"
	    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-[60px] mx-auto p-5 border  shadow-lg rounded-md bg-white w-3/4 md:w-2/5" >
	      <div>
            <!-- task name form -->
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5 inline-block text-gray-700 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
            <h3 class="mb-1 font-extrabold text-gray-700 inline-block">Name</h3>
            <input 
                type="text" 
                class="w-full px-3 py-3 mb-10 mt-2 shadow-gray-400 shadow focus:outline-blue-500" 
                placeholder="enter task name ..."
                v-model="editedTaskName" 
                ref="taskNameForm">

            <!-- description form -->
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5 inline-block text-gray-700 mr-2" 
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
                class="rounded w-full p-2 mt-2 placeholder:text-sm shadow-gray-400 shadow mb-10  focus:outline-blue-500" 
                placeholder="Enter a description for this task..." 
                rows="3"
                v-model="taskDescription"/>

            <!-- choose date form -->
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5 inline-block text-gray-700 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                stroke-width="2">
                <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 class="mb-1 font-extrabold text-gray-700 inline-block">Due date</h3>
            <input 
                type="date" 
                class="w-full px-3 py-3 mb-10 mt-2 shadow-gray-400 shadow focus:outline-blue-500"
                v-model="taskDate">

            <!-- choose time form -->
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5 inline-block text-gray-700 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                stroke-width="2">
                <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="mb-1 font-extrabold text-gray-700 inline-block">Due time</h3>
            <input 
                type="time" 
                class="w-full px-3 py-3 mb-8 cursor-pointe10 mt-2 shadow-gray-400 shadow focus:outline-blue-500"
                v-model="taskTime">
            
            <!-- completed task form is visible if user has choosen the date for task -->
            <div class="flex space-x-3" v-if="taskDate">
                <input 
                type="checkbox" 
                class="form-checkbox h-5 w-5 text-gray-600"
                v-model="taskDone">
                <span>I completed this task</span>
            </div>
            
            <div class="md:flex gap-4 md:items-center pb-3 pt-8">
                <button
                    @click="deleteTask"
                    class="px-4 py-2 mb-3 md:mb-0 text-red-800 border-2 border-solid border-red-700 font-bold rounded-md w-full shadow-sm hover:bg-red-700 hover:text-white transition ease-out duration-200">
                    DELETE THIS TASK
                </button>
                <button
                    @click="changeTask"
                    class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-300">
                    SAVE
                </button>
            </div>
	    </div>
    </div>
  </div>
</template>