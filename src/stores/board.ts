import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { Column } from '../types'

export const boardColumns = defineStore({
  id: 'board',

  state: () => ({
    columns: useStorage<Column[]>('columns', [])
  }),

  getters: {},

  actions: {
    addColumn(itemName: string) {
      const newCol: Column = {
        name: itemName,
        tasks : []
      }
      this.columns.push(newCol)
    }
  }
})
