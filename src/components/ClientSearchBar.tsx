'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { SearchBar } from '@/components/SearchBar';

export function ClientSearchBar({ initialQuery = '' }: { initialQuery?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const handleSearch = (query: string) => {
    // Create a new URLSearchParams object
    const params = new URLSearchParams(searchParams.toString());
    
    // Update or remove the query parameter
    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }
    
    // Reset to page 1 when searching
    params.delete('page');
    
    // Navigate to the new URL
    router.push(`${pathname}?${params.toString()}`);
  };
  
  return <SearchBar initialQuery={initialQuery} onSearch={handleSearch} />;
}
