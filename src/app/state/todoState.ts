import { atom } from 'recoil';

export type Todo = {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
};

export const todoListState = atom<Todo[]>({
  key: 'todoListState',
  default: [],
});

export const selectedTodoState = atom<Todo | null>({
  key: 'selectedTodoState',
  default: null,
});
