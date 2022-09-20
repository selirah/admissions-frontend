export interface Client {
  id: number;
  school_name: string;
  user_id: number;
  category: string;
  region: string;
  town: string;
  phone: string;
  total_students: number;
  total_students_accessed: number;
  total_students_pending: number;
  total_students_blocked: number;
  created_at: string;
  key: number;
}
