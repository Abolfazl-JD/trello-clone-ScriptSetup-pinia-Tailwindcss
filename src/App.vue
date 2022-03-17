<script setup lang="ts">
import { ref } from 'vue'
import { boardColumns } from './stores/board'
import BoardColumn from './components/BoardColumn.vue'

const formInp = ref<HTMLInputElement | null>(null)

const addNewList = ref(false)
const showlistControl = ref(false)

const toggleColNameForm = (val: boolean) => {
  addNewList.value = val
  setTimeout(() => {
    val ? formInp.value?.focus() : null
    showlistControl.value = val
  }, 50); 
}

const trelloBoard = boardColumns()

const newColumnName = ref('')
const addColumn = () => {
  if(newColumnName.value) {
    trelloBoard.addColumn(newColumnName.value)
    newColumnName.value = ''
    formInp.value?.focus()
  }
}
</script>

<template>

  <div 
    class="board h-screen overflow-auto px-3 py-3 scrollbar scrollbar-thumb-gray-600 scrollbar-thin scrollbar-track-gray-900" 
    @click.self="toggleColNameForm(false)">
    <div class="flex justify-start items-start gap-5">
      
      <BoardColumn 
        v-for="(column, colIndex) in trelloBoard.columns" 
        :key="colIndex"
        :column="column"
        :colIndex="colIndex"
      />

      <div class="min-w-[280px] bg-gray-200 p-2 rounded cursor-pointer text-gray-600">
        <p 
          v-if="!addNewList"
          class="w-full h-full" 
          @click="toggleColNameForm(true)">+ Add another list</p>
        <template v-else>
          <input 
            type="text" 
            ref="formInp" 
            v-model="newColumnName" 
            placeholder="Enter list title..." 
            @keyup.enter="addColumn" 
            class="px-3 py-2 text-sm w-full focus:outline-blue-600">
          <div 
            class="flex w-full mt-2 place-items-center space-x-2 transition-all ease-out duration-50" 
            :class="!showlistControl ? 'h-0 overflow-hidden' : 'h-8'">
            <button 
              @click="addColumn" 
              class="bg-blue-600 py-2 px-[10px] rounded-sm text-sm text-white hover:bg-blue-700 transition-colors ease-out duration-300">
                Add list
              </button>
            <svg 
              @click="toggleColNameForm(false)" 
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
    </div>
  </div>
</template>

<style>
@import './assets/base.css';

#app {
  height: 100%;
}

.board{
  background-image : url('./assets/images/trello-image2.png');
  background-repeat : no-repeat;
  background-size : cover;
  background-position : center;
}

</style>
