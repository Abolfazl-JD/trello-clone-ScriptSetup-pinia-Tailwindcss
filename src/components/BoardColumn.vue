<script setup lang="ts">
import BoardTask from './BoardTask.vue'
import { boardColumns } from '../stores/board'
import { ref } from 'vue'
import type { Column } from '../types'

interface propsType{
    column : Column,
    colIndex : number
}
const props = defineProps<propsType>()

const textarea = ref<HTMLInputElement | null>(null)

const showTaskNameForm = ref(false)
const showlistControl = ref(false)

const toggleTaskNameForm = (val: boolean) => {
  showTaskNameForm.value = val
  setTimeout(() => {
      val ? textarea.value?.focus() : null
      showlistControl.value = val
  }, 50);
}

const trelloBoard = boardColumns()
const newTaskName = ref('')

const addNewTask = () => {
    if(newTaskName.value){
        trelloBoard.addTask(newTaskName.value, props.colIndex)
        newTaskName.value = ''
        showlistControl.value = false
        showTaskNameForm.value = false
    }
}

</script>

<template>
    <div class="min-w-[280px] bg-gray-300 p-2 rounded-lg cursor-pointer">
        <div class="flex justify-between mb-2 px-2">
          <h3 class="font-bold text-cyan-900">
              {{ props.column.name }}
          </h3>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </div>

        <BoardTask 
          v-for="(task, taskIndex) in props.column.tasks"
          :key="task.id"
          :task="task"
          :taskIndex="taskIndex"
        />

        <p 
            @click="toggleTaskNameForm(true)" 
            v-if="!showTaskNameForm" 
            class="bg-transparent text-gray-500 pl-3 mt-3 py-1 transition-colors ease-out duration-200 rounded hover:bg-gray-400/50 hover:text-gray-700">
            + Add a card
        </p>
        <template v-else>
          <textarea 
            ref="textarea"
            v-model="newTaskName"
            @keyup.enter="addNewTask"
            @keyup.esc="toggleTaskNameForm(false)"
            class="rounded w-full p-2 placeholder:text-sm shadow-gray-400 shadow outline-none mt-2" 
            placeholder="Enter a title for this task..." 
            rows="3"/>
          <div 
            class="flex w-full mt-1 place-items-center space-x-2 transition-all ease-out duration-50" 
            :class="!showlistControl ? 'h-0 overflow-hidden' : 'h-8'">
            <button 
                @click="addNewTask"
                class="bg-blue-600 py-2 px-[10px] rounded-sm text-sm text-white hover:bg-blue-700 transition-colors ease-out duration-300">Add task</button>
            <svg
              @click="toggleTaskNameForm(false)"    
              class="h-6 w-6 text-gray-700 transition-colors ease-out duration-200 hover:text-gray-900" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </template>
      </div>
</template>