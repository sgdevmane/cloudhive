'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Idea } from '@/types';
import { voteOnIdea } from '@/app/actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api';

type ClientVoteButtonsProps = {
  idea: Idea;
};

export function ClientVoteButtons({ idea }: ClientVoteButtonsProps) {
  const queryClient = useQueryClient();
  const [isVoting, setIsVoting] = useState(false);
  
  const voteMutation = useMutation({
    mutationFn: async (voteType: 'upvote' | 'downvote') => {
      setIsVoting(true);
      return voteOnIdea(idea.id, voteType);
    },
    onSuccess: () => {
      // Invalidate and refetch the ideas list and current idea
      queryClient.invalidateQueries({ queryKey: queryKeys.ideas });
      queryClient.invalidateQueries({ queryKey: queryKeys.idea(idea.id) });
    },
    onError: (error) => {
      console.error('Error voting on idea:', error);
      alert('Failed to vote on idea. Please try again.');
    },
    onSettled: () => {
      setIsVoting(false);
    },
  });
  
  const handleVote = (voteType: 'upvote' | 'downvote') => {
    voteMutation.mutate(voteType);
  };
  
  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant="secondary" 
        size="sm" 
        onClick={() => handleVote('upvote')}
        disabled={isVoting}
        className="group flex items-center gap-1 px-3 py-1.5"
        aria-label="Upvote"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${isVoting ? 'opacity-50' : 'group-hover:text-green-600'}`}
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
        <span className="font-medium">{idea.upvotes}</span>
      </Button>
      <Button 
        variant="secondary" 
        size="sm" 
        onClick={() => handleVote('downvote')}
        disabled={isVoting}
        className="group flex items-center gap-1 px-3 py-1.5"
        aria-label="Downvote"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${isVoting ? 'opacity-50' : 'group-hover:text-red-600'}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
        <span className="font-medium">{idea.downvotes}</span>
      </Button>
    </div>
  );
}
