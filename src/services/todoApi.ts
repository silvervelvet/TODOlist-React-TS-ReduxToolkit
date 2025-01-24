import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TaskType {
  id: string;
  description: string;
  status: 'todo' | 'isActive' | 'isDone';
  isFavourites?: boolean;
}

export type TodoTag = { type: 'Todos'; id: 'LIST' };

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  endpoints: (builder) => ({
    getTodos: builder.query<TaskType[], void>({
      query: () => 'todos',
      providesTags: [{ type: 'Todos', id: 'LIST' }] as TodoTag[],
    }),
    addTodo: builder.mutation<TaskType, TaskType>({
      query: (task) => ({
        url: 'todos',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }] as TodoTag[],
    }),
    deleteTodo: builder.mutation<void, string>({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }] as TodoTag[],
    }),
    updateTodoStatus: builder.mutation<TaskType, { id: string, status: 'todo' | 'isActive' | 'isDone' }>({
      query: ({ id, status }) => ({
        url: `todos/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }] as TodoTag[],
    }),
    updateTodoFavourite: builder.mutation<TaskType, { id: string, isFavourites: boolean }>({
      query: ({ id, isFavourites }) => ({
        url: `todos/${id}`,
        method: 'PATCH',
        body: { isFavourites },
      }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }] as TodoTag[],
    }),
  }),
  tagTypes: ['Todos'],
});

export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useUpdateTodoStatusMutation, useUpdateTodoFavouriteMutation } = todoApi;
