export interface Option {
  id: string;
  choice: string;
  right: boolean;
}

export interface Question {
  id: string;
  title: string;
  options: Option[];
}
