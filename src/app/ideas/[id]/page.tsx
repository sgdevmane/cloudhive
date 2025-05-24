'use client';

import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { getIdeaById, deleteIdea } from '@/app/actions';
import { ClientVoteButtons } from '@/components/ClientVoteButtons';
import Link from 'next/link';
import { Priority } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ClientDeleteButton } from '@/components/ClientDeleteButton';
import { queryKeys } from '@/lib/api';

async function fetchIdea(id: string) {
  const result = await getIdeaById(id);
  if (!result || !result.idea) {
    throw new Error('Idea not found');
  }
  return result;
}

export default function IdeaDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id || '';
  
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.idea(id),
    queryFn: () => fetchIdea(id),
    enabled: !!id, // Only run the query if id exists
  });

  const queryClient = useQueryClient();
  const deleteIdeaMutation = useMutation({
    mutationFn: async () => {
      const result = await deleteIdea(id);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ideas });
      router.push('/');
    },
    onError: (error) => {
      console.error('Error deleting idea:', error);
      alert('Failed to delete idea. Please try again.');
    },
  }).mutateAsync;

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div>Loading...</div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div>Error loading idea</div>
      </div>
    );
  }

  const { idea, employee } = data;
  const formattedDate = new Date(idea.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const priorityColor = {
    Low: 'text-green-700 bg-green-100',
    Medium: 'text-yellow-700 bg-yellow-100',
    High: 'text-red-700 bg-red-100',
  }[idea.priority as Priority] || 'bg-gray-100 text-gray-800';

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mb-6"
        >
          ← Back to Ideas
        </Link>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{idea.summary}</h1>
          <span className={`text-sm font-medium px-3 py-1 rounded-full ${priorityColor}`}>
            {idea.priority} Priority
          </span>
        </div>
        
        {employee && (
          <div className="flex items-center">
            <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
              <Image
                src={employee.profileImage}
                alt={`${employee.firstName} ${employee.lastName}`}
                width={40}
                height={40}
                className="w-full h-full object-cover"
                unoptimized={employee.profileImage.startsWith('http')}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {employee.firstName} {employee.lastName}
              </p>
              <p className="text-xs text-gray-500">Submitted on {formattedDate}</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="prose max-w-none">
          <p className="whitespace-pre-line text-gray-700">{idea.description}</p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <ClientVoteButtons idea={idea} />
            <div className="flex items-center gap-3">
              <ClientDeleteButton 
                ideaId={idea.id} 
                onDelete={deleteIdeaMutation}
                className="hover:bg-red-50 p-2 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
