import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { Column, Task, SentTask } from '../types'
import { uuid } from './utils'

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
    },

    addTask(taskName : string, colIndex : number) {
      const newTask: Task = {
        name: taskName,
        description: '',
        date: '',
        time: '',
        completed : false,
        id: uuid()
      }
      this.columns[colIndex].tasks.push(newTask)
    },

    editColName(colIndex : number, newColName: string) {
      this.columns[colIndex].name = newColName
    },

    archiveColumn(colIndex : number) {
      this.columns.splice(colIndex, 1)
    },

    editTask(task : Task, newTask : SentTask) {
      Object.assign(task, newTask)
    },

    toggleCheckTask(task: Task) {
      task.completed = !task.completed
    },

    archiveTask(deletedTask: Task, colIndex : number) {
      this.columns[colIndex].tasks = this.columns[colIndex].tasks.filter(task => task.id !== deletedTask.id)
    },

    moveTask(fromColumnIndex : number, toColumnIndex: number, taskIndex: number) {
      const taskToMove = this.columns[fromColumnIndex].tasks.splice(
        taskIndex,
        1
      )[0]
      this.columns[toColumnIndex].tasks.push(taskToMove)
    },

    moveColumn(fromColumnIndex: number, toColumnIndex: number) {
      const columnList = this.columns
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
      columnList.splice(toColumnIndex, 0, columnToMove)
    },
  }
})
