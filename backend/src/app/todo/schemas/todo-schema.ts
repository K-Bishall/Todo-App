import { z } from 'zod';

export const todoSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().min(1, 'Description is required'),
  dateTime: z.coerce.date(),
});

export type TodoRequest = z.infer<typeof todoSchema>;

export const todoFiltersSchema = z.object({
  isDone: z.preprocess((value) => {
    if (typeof value === 'string') {
      return value === 'true' ? true : value === 'false' ? false : value;
    }
  }, z.boolean().optional().nullable()),
});

export type TodoFilters = z.infer<typeof todoFiltersSchema>;
