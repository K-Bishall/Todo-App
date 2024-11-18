import {
  useMutation,
  useQuery,
} from "react-query";
import axios from "axios";

const API_URL = "http://localhost:8000";

export interface Task {
  id: string;
  title: string;
  description: string;
  dateTime: Date;
  isDone: boolean;
}

export type TaskRequest = Pick<Task, "title" | "description" | "dateTime">;

interface AllTasks {
  data: Task[];
}

interface Filters {
  isDone: boolean;
}

export const getAllTodosQueryKey = () => "getTasksQueryKey";

export function useGetAllTodos(filters: Filters) {
  return useQuery({
    queryKey: [getAllTodosQueryKey(), filters],
    queryFn: async () => {
      const result = await axios.get<AllTasks>(`${API_URL}/api/todos`, {
        params: filters,
      });

      return result.data;
    },
  });
}

export function useCreateTodo() {
  return useMutation({
    mutationFn: async (data: TaskRequest) => {
      const result = await axios.post<Task>(`${API_URL}/api/todos`, data);

      return result.data;
    },
  });
}

export function useEditTodo() {
  return useMutation({
    mutationFn: async (data: TaskRequest & { id: string }) => {
      const result = await axios.put<Task>(`${API_URL}/api/todos/${data.id}`, data);

      return result.data;
    },
  });
}

export function useDeleteTodo() {
  return useMutation({
    mutationFn: async (id: string) => {
      const result = await axios.delete<void>(`${API_URL}/api/todos/${id}`);

      return result.data;
    },
  });
}

export function useToggleTodoAsDone() {
  return useMutation({
    mutationFn: async (id: string) => {
      const result = await axios.put<void>(`${API_URL}/api/todos/${id}/toggle-done`);

      return result.data;
    },
  });
}