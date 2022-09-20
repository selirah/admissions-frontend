export interface User {
  id: number;
  email: string;
  phone: string;
  name: string;
  email_verified_at: string;
  password: string;
  role: string;
  is_verified: number;
  is_revoke: number;
  created_at: string;
  updated_at: string;
  token: string;
  admin_id: number;
  school_id: number;
}
