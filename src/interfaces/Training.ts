export interface Training {
  id: number;
  year: string;
  location: string;
  date_time: string;
  list_total: number;
  created_at: string;
  updated_at: string;
  date: any;
  key: number;
}

export interface TrainingList {
  id: number;
  school_name: string;
  region: string;
  town: string;
  location: string;
  date_time: string;
  reps: {
    rep_one: string;
    phone_one: string;
    picture_one: string;
    rep_two: string;
    phone_two: string;
    picture_two: string;
  };
  created_at: string;
  updated_at: string;
  key: number;
}
