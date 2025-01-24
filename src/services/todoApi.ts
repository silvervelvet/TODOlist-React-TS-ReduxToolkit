import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TaskType {
  id: string;
  description: string;
  status: 'todo' | 'isActive' | 'isDone';
  isFavourites?: boolean;
}

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  endpoints: (builder) => ({
    getTodos: builder.query<TaskType[], void>({
      query: () => 'todos',
    }),
    addTodo: builder.mutation<TaskType, TaskType>({
      query: (task) => ({
        url: 'todos',
        method: 'POST',
        body: task,
      }),
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation } = todoApi;
