import { ClientPagination } from "@/components/ClientPagination"
import { ClientSearchBar } from "@/components/ClientSearchBar"
import { IdeaCard } from "@/components/IdeaCard"
import { NewIdeaButton } from "@/components/NewIdeaButton"
import { SearchParams } from "@/types"

import { getIdeas } from "./actions"

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
  } as SearchParams);
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Feature Ideas</h1>
          <p className="text-gray-600">
            Browse and vote on feature ideas for Integration Hub
          </p>
        </div>
        <NewIdeaButton />
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
          <NewIdeaButton />
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ideas.map((idea) => (
              <IdeaCard 
                key={idea.id} 
                idea={idea} 
                employeeId={idea.employeeId}
              />
            ))}
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
