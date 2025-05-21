'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Idea } from '@/types';
import { voteOnIdea } from '@/app/actions';

type ClientVoteButtonsProps = {
  idea: Idea;
};

export function ClientVoteButtons({ idea }: ClientVoteButtonsProps) {
  const router = useRouter();
  const [isVoting, setIsVoting] = useState(false);
  
  const handleVote = async (voteType: 'upvote' | 'downvote') => {
    try {
      setIsVoting(true);
      await voteOnIdea(idea.id, voteType);
      router.refresh();
    } catch (error) {
      console.error('Error voting on idea:', error);
      alert('Failed to vote on idea. Please try again.');
    } finally {
      setIsVoting(false);
    }
  };
  
  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant="secondary" 
        size="sm" 
        onClick={() => handleVote('upvote')}
        disabled={isVoting}
        className="group"
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
          className="mr-1 group-hover:text-green-600"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        {idea.upvotes}
      </Button>
      <Button 
        variant="secondary" 
        size="sm" 
        onClick={() => handleVote('downvote')}
        disabled={isVoting}
        className="group"
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
          className="mr-1 group-hover:text-red-600"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
        {idea.downvotes}
      </Button>
    </div>
  );
}
