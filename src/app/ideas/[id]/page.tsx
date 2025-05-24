import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getIdeaById } from '@/app/actions';
import { ClientVoteButtons } from '@/components/ClientVoteButtons';
import Link from 'next/link';
import { Priority } from '@/types';

export default async function IdeaDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const result = await getIdeaById(params.id);

  if (!result || !result.idea) {
    notFound();
  }

  const { idea, employee } = result;
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
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link 
                href={`/ideas/${idea.id}/edit`}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Edit Idea
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
