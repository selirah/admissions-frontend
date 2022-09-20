export interface Upload {
  excel: File;
  programme_id: number;
  academic_year: string;
  sheet: number;
  start_row: number;
  school_id: number | string;
}
