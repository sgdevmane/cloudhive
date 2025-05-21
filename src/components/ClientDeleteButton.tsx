'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { deleteIdea } from '@/app/actions';

type ClientDeleteButtonProps = {
  ideaId: string;
  redirectToHome?: boolean;
};

export function ClientDeleteButton({ ideaId, redirectToHome = false }: ClientDeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this idea?')) {
      return;
    }
    
    try {
      setIsDeleting(true);
      await deleteIdea(ideaId);
      
      if (redirectToHome) {
        router.push('/');
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error('Error deleting idea:', error);
      alert('Failed to delete idea. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <Button 
      variant="danger" 
      size="sm" 
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? 'Deleting...' : 'Delete Idea'}
    </Button>
  );
}
