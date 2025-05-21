'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { IdeaForm } from '@/components/IdeaForm';
import { Card } from '@/components/ui/Card';
import { Employee } from '@/types';

type NewIdeaButtonProps = {
  employees: Employee[];
};

export function NewIdeaButton({ employees }: NewIdeaButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <>
      <Button variant="primary" onClick={openModal}>
        Submit New Idea
      </Button>
      
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <Card>
              <Card.Header>
                <div className="flex justify-between items-center">
                  <div>
                    <Card.Title>Submit New Idea</Card.Title>
                    <Card.Description>
                      Share your feature idea for Integration Hub
                    </Card.Description>
                  </div>
                  <button 
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>
              </Card.Header>
              <Card.Content>
                <IdeaForm 
                  employees={employees} 
                  onSuccess={closeModal}
                />
              </Card.Content>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
