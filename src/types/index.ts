export type Employee = {
  id: string;
  name: string;
  profileImage: string;
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
  page: number;
  limit: number;
};

export type SearchParams = {
  query?: string;
} & PaginationParams;
