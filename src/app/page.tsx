import { getIdeas, getEmployees } from './actions';
import { IdeaCard } from '@/components/IdeaCard';
import { ClientSearchBar } from '@/components/ClientSearchBar';
import { ClientPagination } from '@/components/ClientPagination';
import { NewIdeaButton } from '@/components/NewIdeaButton';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Employee, Idea } from '@/types';

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string; query?: string };
}) {
  // Get the current page and search query from URL params
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const searchQuery = searchParams.query || '';
  
  // Fetch ideas with pagination and search
  const { ideas, totalPages, totalIdeas } = await getIdeas({
    page: currentPage,
    limit: 20,
    query: searchQuery,
  });
  
  // Fetch all employees to display in idea cards
  const employees = await getEmployees();
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Feature Ideas</h1>
          <p className="text-gray-600">
            Browse and vote on feature ideas for Integration Hub
          </p>
        </div>
        <NewIdeaButton employees={employees} />
      </div>
      
      <div className="flex justify-center md:justify-start">
        <ClientSearchBar initialQuery={searchQuery} />
      </div>
      
      {ideas.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">No ideas found</h2>
          {searchQuery ? (
            <p className="text-gray-600 mb-4">
              No ideas match your search query. Try a different search or clear the filter.
            </p>
          ) : (
            <p className="text-gray-600 mb-4">
              There are no ideas yet. Be the first to submit one!
            </p>
          )}
          <NewIdeaButton employees={employees} />
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ideas.map((idea: Idea) => {
              const employee = employees.find((emp: Employee) => emp.id === idea.employeeId);
              return employee ? (
                <IdeaCard key={idea.id} idea={idea} employee={employee} />
              ) : null;
            })}
          </div>
          
          {totalPages > 1 && (
            <div className="mt-8">
              <ClientPagination
                currentPage={currentPage}
                totalPages={totalPages}
              />
              <p className="text-center text-sm text-gray-500 mt-2">
                Showing {ideas.length} of {totalIdeas} ideas
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
