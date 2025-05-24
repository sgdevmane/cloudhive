'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IdeaForm } from '@/components/IdeaForm';

export default function NewIdeaPage() {
  const router = useRouter();
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('/api/employees');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleSuccess = () => {
    router.push('/');
    router.refresh();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit a New Idea</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Share your feature idea with the team. All fields marked with <span className="text-red-500">*</span> are required.</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="max-w-2xl mx-auto">
          <IdeaForm 
            employees={employees} 
            onSuccess={handleSuccess} 
          />
        </div>
      </div>
    </div>
  );
}
