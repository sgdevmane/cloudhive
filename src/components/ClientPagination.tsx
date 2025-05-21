'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Pagination } from '@/components/Pagination';

type ClientPaginationProps = {
  currentPage: number;
  totalPages: number;
};

export function ClientPagination({ currentPage, totalPages }: ClientPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const handlePageChange = (page: number) => {
    // Create a new URLSearchParams object
    const params = new URLSearchParams(searchParams.toString());
    
    // Update the page parameter
    params.set('page', page.toString());
    
    // Navigate to the new URL
    router.push(`${pathname}?${params.toString()}`);
  };
  
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}
