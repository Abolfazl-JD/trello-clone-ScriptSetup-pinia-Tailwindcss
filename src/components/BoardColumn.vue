<script setup lang="ts">
import BoardTask from './BoardTask.vue'
import { ref } from 'vue'
import type { Column } from '../types'

import { boardColumns } from '../stores/board'
const trelloBoard = boardColumns()

interface propsType{
    column : Column,
    colIndex : number
}
const props = defineProps<propsType>()

// new task name form 
const textarea = ref<HTMLInputElement | null>(null)

const showTaskNameForm = ref(false)
const showlistControl = ref(false)

const toggleTaskNameForm = (val: boolean) => {
  showTaskNameForm.value = val
  setTimeout(() => {
      // no focus when there is no form
      val ? textarea.value?.focus() : null

      showlistControl.value = val
  }, 50);
}

// new task name form value
const newTaskName = ref('')

const addNewTask = () => {
    if(newTaskName.value){
        trelloBoard.addTask(newTaskName.value, props.colIndex)
        newTaskName.value = ''
        // focus on new task name form; again, So user can add task name again
        textarea.value?.focus()
    }
}

// enability to edit column name
const editColName = ref(false)
const newColName = ref(props.column.name)
// edit column name form input
const colNameForm = ref<HTMLInputElement | null>(null)

const visibleEditColForm = () => {
  editColName.value = true
    setTimeout(() => {
      colNameForm.value?.select()
    }, 50)
}

const changeColName = () => {
  // hide edit column name form 
  editColName.value = false

  if(newColName.value){
    trelloBoard.editColName(props.colIndex, newColName.value)
  }
  else {
    // reset column name to its previous version
    newColName.value = props.column.name
  }
}

const deleteColumn = () => {
  trelloBoard.archiveColumn(props.colIndex)
}
</script>

<template>
    <div class="min-w-[280px] bg-gray-300 p-2 rounded-lg cursor-pointer">
        <div class="flex justify-between mb-2 space-x-2">
          <div 
            @click="visibleEditColForm"
            class="grow">
            <h3 
              v-if="!editColName" 
              class="font-bold text-cyan-900 pl-2">
              {{ column.name }}
            </h3>

            <!-- edit column name form -->
            <input
              v-else
              v-model="newColName" 
              ref="colNameForm"
              @blur="changeColName"
              @keyup.enter="changeColName"
              @keyup.esc="changeColName"
              type="text" 
              placeholder="Enter list title..."
              class="px-2 py-1 text-sm w-full focus:outline-blue-600"
              autofocus>
          </div>
          <svg 
            @click="deleteColumn" 
            class="w-4 text-gray-500 h-auto" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            stroke-width="2">
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>

        <BoardTask 
          v-for="(task, taskIndex) in column.tasks"
          :key="task.id"
          :task="task"
          :taskIndex="taskIndex"
          :colIndex="colIndex"
        />

        <p 
          @click="toggleTaskNameForm(true)" 
          v-if="!showTaskNameForm" 
          class="bg-transparent text-gray-500 pl-3 mt-3 py-1 transition-colors ease-out duration-200 rounded hover:bg-gray-400/50 hover:text-gray-700">
          + Add a card
        </p>

        <!-- new task name form   -->
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
                class="bg-blue-600 py-2 px-[10px] rounded-sm text-sm text-white hover:bg-blue-700 transition-colors ease-out duration-300">
                Add task
            </button>
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