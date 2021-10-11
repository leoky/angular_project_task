export interface Task {
    id?: string;
    project?: any;
    project_id?: string;
    project_name?: string;
    user?: any;
    user_id?: string;
    title?: string;
    slug?: string;
    description?: string;
    due_date: Date;
    status?: string;
    assigned_to?: string;
    assigned_to_user?: string;
    assigned_to_user_id?: string;
    created_at?: Date;
    created_by?: string;
    delete_at?: string;
}