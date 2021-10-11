import { Task } from "./task";

export interface Project {
    id?: string;
    name: string;
    slug?: string;
    description?: string;
    manager: string;
    tasks?: Task[];
    created_at?: Date;
    created_by?: string;
    delete_at?: string;
    manager_id?: string;
    managed_by?: string;
    user_id?: string;
}