'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ClientPagination } from "@/components/ClientPagination";
import { ClientSearchBar } from "@/components/ClientSearchBar";
import { IdeaCard } from "@/components/IdeaCard";
import { SearchParams } from "@/types";
import { getIdeas } from "./actions";
import { queryKeys } from "@/lib/api";

export default function Home() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const queryParam = searchParams.get('query');
  
  // Get the current page and search query from URL params
  const currentPage = pageParam ? parseInt(pageParam) : 1;
  const searchQuery = queryParam || '';

  // Fetch ideas with pagination and search
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.ideasWithParams({ page: currentPage, limit: 20, query: searchQuery }),
    queryFn: () => getIdeas({
      page: currentPage,
      limit: 20,
      query: searchQuery,
    } as SearchParams),
  });

  const { ideas = [], totalPages = 0, totalIdeas = 0 } = data || {};
  
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-6 h-32"></div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Failed to load ideas. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Feature Ideas</h1>
          <p className="text-gray-600">
            Browse and vote on feature ideas for Integration Hub
          </p>
        </div>
      </div>

      <div className="flex justify-center md:justify-start">
        <ClientSearchBar initialQuery={searchQuery} />
      </div>

      {ideas.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">No ideas found</h2>
          {searchQuery ? (
            <p className="text-gray-600 mb-4">
              No ideas match your search query. Try a different search or clear
              the filter.
            </p>
          ) : (
            <p className="text-gray-600 mb-4">
              There are no ideas yet. Be the first to submit one!
            </p>
          )}
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
