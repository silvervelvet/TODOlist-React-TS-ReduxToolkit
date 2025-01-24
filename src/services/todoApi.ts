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
    deleteTodo: builder.mutation<void, string>({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
    }),
    updateTodoStatus: builder.mutation<TaskType, { id: string, status: 'todo' | 'isActive' | 'isDone' }>({
      query: ({ id, status }) => ({
        url: `todos/${id}`,
        method: 'PATCH',
        body: { status },
      }),
    }),
    updateTodoFavourite: builder.mutation<TaskType, { id: string, isFavourites: boolean }>({
      query: ({ id, isFavourites }) => ({
        url: `todos/${id}`,
        method: 'PATCH',
        body: { isFavourites },
      }),
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useUpdateTodoStatusMutation, useUpdateTodoFavouriteMutation } = todoApi;



