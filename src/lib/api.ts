import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

export const queryKeys = {
  ideas: ['ideas'],
  idea: (id: string) => [...queryKeys.ideas, id],
  ideasWithParams: (params: { page?: number; limit?: number; query?: string }) => 
    [...queryKeys.ideas, 'list', params],
  employees: ['employees'],
  employee: (id: string) => [...queryKeys.employees, id],
};
