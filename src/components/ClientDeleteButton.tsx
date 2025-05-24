"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteIdea } from "@/app/actions";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { queryKeys } from "@/lib/api";

type ClientDeleteButtonProps = {
  ideaId: string;
  redirectToHome?: boolean;
  className?: string;
  onDelete?: () => Promise<unknown>;
};

export function ClientDeleteButton({
  ideaId,
  redirectToHome = false,
  className = "",
  onDelete,
}: ClientDeleteButtonProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (onDelete) {
        return onDelete();
      }
      return deleteIdea(ideaId);
    },
    onSuccess: () => {
      // Invalidate and refetch if not using external onDelete
      if (!onDelete) {
        queryClient.invalidateQueries({ queryKey: queryKeys.ideas });
        queryClient.invalidateQueries({ queryKey: queryKeys.idea(ideaId) });
        
        if (redirectToHome) {
          router.push("/");
        }
      }
    },
    onError: (error) => {
      console.error("Error deleting idea:", error);
      alert("Failed to delete idea. Please try again.");
    },
  });

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setShowDeleteModal(true);
        }}
        disabled={deleteMutation.isPending}
        className={`text-red-500 hover:text-red-700 transition-colors ${className}`}
        aria-label="Delete idea"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={deleteMutation.isPending ? "opacity-50" : ""}
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      </button>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => deleteMutation.mutate()}
        title="Delete Idea"
        description="Are you sure you want to delete this idea? This action cannot be undone."
      />
    </>
  );
}
