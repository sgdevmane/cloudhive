export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  name: string; // Keeping for backward compatibility
  profileImage: string;
  department?: string;
  email?: string;
  jobTitle?: string;
};

export type Priority = 'High' | 'Medium' | 'Low';

export type Idea = {
  id: string;
  summary: string;
  description: string;
  employeeId: string;
  priority: Priority;
  upvotes: number;
  downvotes: number;
  createdAt: string;
};

export type IdeaFormData = {
  summary: string;
  description: string;
  employeeId: string;
  priority: Priority;
};

export type PaginationParams = {
  page: string | number;
  limit: number;
};

export type SearchParams = {
  query?: string;
} & PaginationParams;

export type IdeaWithEmployee = {
  idea: Idea;
  employee: Employee | null;
};
