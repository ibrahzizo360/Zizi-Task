export interface Todo {
    id: number;
    todo: string;
    isDone: boolean;
}

export type Actions =
  | { type: "ADD"; payload: string }
  | { type: "DELETE"; payload: number }
  | { type: "DONE"; payload: number }
  | { type: "INITIAL"} ;