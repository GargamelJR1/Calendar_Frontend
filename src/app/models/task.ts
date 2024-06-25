//split into base and extended interfaces if needed

export interface Task {
    id: number;
    name: string;
    description: string;
    tags?: string[];
    priority: string;
    completed: boolean;
    deadline: Date;
    completeDate?: Date;
    createdAt?: Date;
    masterTask?: number;
    subTasks?: Task[];
}

export interface TaskDTO extends Task {
    userEmail: string;
}
