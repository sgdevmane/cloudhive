"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { ClientDeleteButton } from "@/components/ClientDeleteButton";
import { ClientVoteButtons } from "@/components/ClientVoteButtons";
import { Card } from "@/components/ui/Card";
import { Idea } from "@/types";
import { queryKeys } from "@/lib/api";

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  department: string;
  profileImage: string;
};

type IdeaCardProps = {
  idea: Idea;
  employeeId: string;
};

async function fetchEmployee(id: string): Promise<Employee> {
  const response = await fetch(`/api/employees/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch employee');
  }
  return response.json();
}

export function IdeaCard({ idea, employeeId }: IdeaCardProps) {
  const { data: employee, isLoading, error } = useQuery<Employee>({
    queryKey: queryKeys.employee(employeeId),
    queryFn: () => fetchEmployee(employeeId),
    enabled: !!employeeId,
  });

  if (isLoading) {
    return (
      <div className="animate-pulse bg-gray-100 rounded-lg p-4">
        Loading employee data...
      </div>
    );
  }

  if (error || !employee) {
    return null; // or return a placeholder/skeleton
  }


  // Format the date to be more readable
  const formattedDate = new Date(idea.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Get the priority color
  const priorityColor = {
    High: "text-red-600",
    Medium: "text-yellow-600",
    Low: "text-green-600",
  }[idea.priority];

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <Card.Header className="pb-2">
        <div className="flex justify-between items-start">
          <Link href={`/ideas/${idea.id}`} className="hover:underline">
            <Card.Title>{idea.summary}</Card.Title>
          </Link>
          <span className={`text-sm font-medium ${priorityColor}`}>
            {idea.priority}
          </span>
        </div>
        <div className="flex items-center mt-2">
          <div className="relative w-6 h-6 rounded-full overflow-hidden mr-2">
            <Image
              src={employee.profileImage}
              alt={`${employee.firstName} ${employee.lastName}`}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <span className="text-sm text-gray-600">{`${employee.firstName} ${employee.lastName}`}</span>
          <span className="text-xs text-gray-400 ml-auto">{formattedDate}</span>
        </div>
      </Card.Header>
      <Card.Content className="pt-2">
        <p className="text-sm text-gray-700 line-clamp-2">{idea.description}</p>
      </Card.Content>
      <Card.Footer className="flex justify-between items-center pt-4 border-t border-gray-100">
        <ClientVoteButtons idea={idea} />
        <div className="flex items-center space-x-3">
          <ClientDeleteButton ideaId={idea.id} className="hover:bg-gray-100 p-1.5 rounded-full" />
          <Link
            href={`/ideas/${idea.id}`}
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            View Details
          </Link>
        </div>
      </Card.Footer>
    </Card>
  );
}
