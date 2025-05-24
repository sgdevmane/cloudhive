"use client";

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import { ClientDeleteButton } from "@/components/ClientDeleteButton"
import { ClientVoteButtons } from "@/components/ClientVoteButtons"
import { Card } from "@/components/ui/Card"
import { Idea } from "@/types"

type IdeaCardProps = {
  idea: Idea;
  employeeId: string;
};

export function IdeaCard({ idea, employeeId }: IdeaCardProps) {
  const [employee, setEmployee] = useState<{
    id: string;
    firstName: string;
    lastName: string;
    department: string;
    profileImage: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`/api/employees/${employeeId}`);
        const data = await response.json();
        setEmployee(data);
      } catch (error) {
        console.error("Error fetching employee:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (employeeId) {
      fetchEmployee();
    } else {
      setIsLoading(false);
    }
  }, [employeeId]);

  if (isLoading) {
    return (
      <div className="animate-pulse bg-gray-100 rounded-lg p-4">
        Loading employee data...
      </div>
    );
  }

  if (!employee) {
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
      <Card.Footer className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <ClientVoteButtons idea={idea} />
        <div className="flex space-x-2">
          <Link
            href={`/ideas/${idea.id}`}
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            View Details
          </Link>
          {/* Modal implementation (kept for reference)
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => {
              // Create and show modal dialog
              const modal = document.createElement('dialog');
              modal.className = 'fixed inset-0 h-screen w-screen bg-black bg-opacity-50 flex items-center justify-center p-4 z-50';
              
              const content = document.createElement('div');
              content.className = 'bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] p-6 overflow-y-auto';
              content.innerHTML = `
                <div class="flex justify-between items-start mb-4">
                  <h2 class="text-2xl font-bold">${idea.summary}</h2>
                  <span class="text-sm font-medium px-3 py-1 rounded-full bg-gray-100 ${priorityColor}">
                    ${idea.priority} Priority
                  </span>
                </div>
                <div class="flex items-center text-sm text-gray-600 mb-6">
                  <div class="relative w-8 h-8 rounded-full overflow-hidden mr-2">
                    <img 
                      src="${employee.profileImage}" 
                      alt="${employee.firstName} ${employee.lastName}"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <span>${employee.firstName} ${employee.lastName}</span>
                  <span class="mx-2">•</span>
                  <span>${formattedDate}</span>
                </div>
                <div class="prose max-w-none">
                  <p class="whitespace-pre-line">${idea.description}</p>
                </div>
                <div class="mt-8 pt-6 border-t border-gray-200">
                  <div class="flex justify-between items-center">
                    <ClientVoteButtons idea={idea} />
                    <div class="flex space-x-2">
                      <ClientDeleteButton ideaId={idea.id} />
                      <button 
                        type="button" 
                        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onclick="this.closest('dialog').close()"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              `;
              
              modal.appendChild(content);
              document.body.appendChild(modal);
              
              // Add event listener to close button
              const closeButton = content.querySelector('button');
              closeButton?.addEventListener('click', () => {
                modal.close();
                document.body.removeChild(modal);
              });
              
              // Close when clicking outside the modal
              modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                  modal.close();
                  document.body.removeChild(modal);
                }
              });
              
              modal.showModal();
            }}
          >
            View Details (Modal)
          </Button>
          */}
          <ClientDeleteButton ideaId={idea.id} />
        </div>
      </Card.Footer>
    </Card>
  );
}
