<script setup lang="ts">
import {ref} from 'vue'

const formInp = ref<HTMLInputElement | null>(null)

const addNewList = ref(false)
const showlistControl = ref(false)

const formVisibility = (val: boolean) => {
  addNewList.value = val
  setTimeout(() => {
    val ? formInp.value?.focus() : null
    showlistControl.value = val
  }, 50); 
}

</script>

<template>
  <div class="board h-screen overflow-auto px-3 py-3 scrollbar scrollbar-thumb-gray-600 scrollbar-thin scrollbar-track-gray-900" @click.self="formVisibility(false)">
    <div class="flex justify-start items-start gap-5">
      <div class="min-w-[280px] bg-gray-300 p-2 rounded-lg cursor-pointer">
        <div class="flex justify-between mb-2 px-2">
          <h3 class="font-bold text-cyan-900">This is the title</h3>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </div>
        <div class="bg-white px-2 pb-[5px] pt-2 rounded flex justify-between group drop-shadow-md">
          <p class="text-sm">go out</p>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 hidden group-hover:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
        <p class="bg-transparent text-gray-500 pl-3 mt-3 py-1 transition-colors ease-out duration-200 hover:bg-gray-400 hover:text-gray-700">
        + Add a card
        </p>
      </div>

      <div class="min-w-[280px] bg-gray-200 p-2 rounded cursor-pointer text-gray-600">
        <p class="w-full h-full" @click="formVisibility(true)" v-if="!addNewList">+ Add another list</p>
        <template v-else>
          <input type="text" ref="formInp" placeholder="Enter list title..." class="px-3 py-2 text-sm w-full focus:outline-blue-600">
          <div class="flex w-full mt-2 place-items-center space-x-2 transition-all ease-out duration-50" :class="!showlistControl ? 'h-0 overflow-hidden' : 'h-8'"  >
            <button class="bg-blue-600 py-2 px-[10px] rounded-sm text-sm text-white hover:bg-blue-700 transition-colors ease-out duration-300">Add list</button>
            <svg xmlns="http://www.w3.org/2000/svg" @click="formVisibility(false)" class="h-6 w-6 text-gray-700 transition-colors ease-out duration-200 hover:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
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
