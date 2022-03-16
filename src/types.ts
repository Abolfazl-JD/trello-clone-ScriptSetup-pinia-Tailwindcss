export interface Task{
    description: string,
    name: string,
    id: string | number,
}

export interface Column {
    name: string,
    tasks : Task[]
}