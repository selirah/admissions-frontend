export interface Transfer {
  id: number;
  student_id: number;
  source_school: number;
  destination_school: number;
  source_programme: number;
  destination_programme: number;
  academic_year: string;
  status: number;
  created_at: string;
  updated_at: string;
  source_school_name: string;
  destination_school_name: string;
  application_number: string;
  surname: string;
  other_names: string;
  phone: string;
  programme_id: string;
  destination_programme_name: string;
  source_programme_name: string;
  key: number;
}
