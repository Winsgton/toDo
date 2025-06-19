export interface Task {
  id: number,
  title: string;
  done: boolean,
  createDt: Date,
  updateDt: Date | undefined
}
