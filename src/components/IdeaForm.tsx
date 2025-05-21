'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { Select } from '@/components/ui/Select';
import { Employee, IdeaFormData, Priority } from '@/types';
import { createIdea } from '@/app/actions';

type IdeaFormProps = {
  employees: Employee[];
  onSuccess?: () => void;
};

export function IdeaForm({ employees, onSuccess }: IdeaFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { 
    control, 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<IdeaFormData>({
    defaultValues: {
      summary: '',
      description: '',
      employeeId: '',
      priority: 'Low',
    },
  });
  
  const onSubmit = async (data: IdeaFormData) => {
    try {
      setIsSubmitting(true);
      await createIdea(data);
      router.refresh();
      
      // Call the onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating idea:', error);
      alert('Failed to create idea. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const priorityOptions = [
    { value: 'High', label: 'High' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Low', label: 'Low' },
  ];
  
  const employeeOptions = employees.map((employee) => ({
    value: employee.id,
    label: employee.name,
  }));
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="summary" className="text-sm font-medium">
          Summary <span className="text-red-500">*</span>
        </label>
        <Input
          id="summary"
          {...register('summary', { required: 'Summary is required' })}
          error={errors.summary?.message}
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description <span className="text-red-500">*</span>
        </label>
        <TextArea
          id="description"
          rows={6}
          {...register('description', { required: 'Description is required' })}
          error={errors.description?.message}
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="employeeId" className="text-sm font-medium">
          Submitted By <span className="text-red-500">*</span>
        </label>
        <Controller
          name="employeeId"
          control={control}
          rules={{ required: 'Employee is required' }}
          render={({ field }) => (
            <Select
              id="employeeId"
              options={employeeOptions}
              value={field.value}
              onChange={field.onChange}
              placeholder="Select an employee"
              error={errors.employeeId?.message}
            />
          )}
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="priority" className="text-sm font-medium">
          Priority
        </label>
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Select
              id="priority"
              options={priorityOptions}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <p className="text-xs text-gray-500">
          Priority defaults to Low if not specified
        </p>
      </div>
      
      <div className="flex justify-end space-x-4 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push('/')}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Idea'}
        </Button>
      </div>
    </form>
  );
}
