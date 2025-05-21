import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Idea, Employee } from '@/types';
import { deleteIdea } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { ClientVoteButtons } from '@/components/ClientVoteButtons';
import { ClientDeleteButton } from '@/components/ClientDeleteButton';

type IdeaCardProps = {
  idea: Idea;
  employee: Employee;
};

export function IdeaCard({ idea, employee }: IdeaCardProps) {
  const router = useRouter();
  
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this idea?')) {
      await deleteIdea(idea.id);
      router.refresh();
    }
  };
  
  // Format the date to be more readable
  const formattedDate = new Date(idea.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  
  // Get the priority color
  const priorityColor = {
    High: 'text-red-600',
    Medium: 'text-yellow-600',
    Low: 'text-green-600',
  }[idea.priority];
  
  return (
    <Card className="hover:shadow-md transition-shadow">
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
              alt={employee.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-sm text-gray-600">{employee.name}</span>
          <span className="text-xs text-gray-400 ml-auto">{formattedDate}</span>
        </div>
      </Card.Header>
      <Card.Content className="pt-2">
        <p className="text-sm text-gray-700 line-clamp-2">
          {idea.description}
        </p>
      </Card.Content>
      <Card.Footer className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <ClientVoteButtons idea={idea} />
        <div className="flex space-x-2">
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => {
              // Open a modal or dialog to view the full idea details
              const modal = document.createElement('dialog');
              modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50';
              
              const content = document.createElement('div');
              content.className = 'bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto';
              
              content.innerHTML = `
                <div class="flex justify-between items-start mb-4">
                  <h2 class="text-2xl font-bold">${idea.summary}</h2>
                  <span class="text-sm font-medium px-3 py-1 rounded-full bg-gray-100 ${priorityColor}">
                    ${idea.priority} Priority
                  </span>
                </div>
                <div class="flex items-center mb-6">
                  <div class="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-200">
                    <img src="${employee.profileImage}" alt="${employee.name}" class="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p class="font-medium">${employee.name}</p>
                    <p class="text-sm text-gray-500">Submitted on ${formattedDate}</p>
                  </div>
                </div>
                <div class="prose max-w-none mb-6">
                  <p class="whitespace-pre-line">${idea.description}</p>
                </div>
                <div class="flex justify-end">
                  <button class="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-800">
                    Close
                  </button>
                </div>
              `;
              
              modal.appendChild(content);
              document.body.appendChild(modal);
              
              // Add event listener to close button
              const closeButton = content.querySelector('button');
              closeButton?.addEventListener('click', () => {
                document.body.removeChild(modal);
              });
              
              // Close when clicking outside the modal
              modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                  document.body.removeChild(modal);
                }
              });
              
              // Show the modal
              modal.showModal();
            }}
          >
            View Details
          </Button>
          <ClientDeleteButton ideaId={idea.id} />
        </div>
      </Card.Footer>
    </Card>
  );
}
