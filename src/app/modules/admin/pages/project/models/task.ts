export interface Task{
    id?: string;
    projectId?: string;
    user?: string;
    title?: string;
    slug?: string;
    description?: string;
    dueDate: Date;
    status?: string;
}