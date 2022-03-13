import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    counter: 0,
    todos: useStorage<string[]>('todos', [])
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++
    }
  }
})
