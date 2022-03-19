export interface Task{
    description: string,
    name: string,
    date: string,
    time: string,
    completed : boolean,
    id: string | number,
}

export interface Column {
    name: string,
    tasks : Task[]
}

export interface SentTask{
    description: string,
    name: string,
    date: string,
    time: string,
    completed : boolean,
}