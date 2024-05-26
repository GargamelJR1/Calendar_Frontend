//split into base and extended interfaces if needed

export interface Task {
    id: number;
    name: string;
    description: string;
    tags: number[];
    priority: string;
    complated: boolean;
    deadline: Date;
    completeDate: Date;
    createdAt: Date;
    master: number;
}
