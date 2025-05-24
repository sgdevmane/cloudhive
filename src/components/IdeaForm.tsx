'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { Select } from '@/components/ui/Select';
import { Employee, IdeaFormData } from '@/types';
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
    formState: { errors },
    clearErrors,
    reset
  } = useForm<IdeaFormData>({
    defaultValues: {
      summary: '',
      description: '',
      employeeId: '',
      priority: 'Low',
    },
    mode: 'onChange',
    reValidateMode: 'onChange'
  });
  
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const onSubmit = async (data: IdeaFormData) => {
    try {
      clearErrors();
      setSubmitError(null);
      setIsSubmitting(true);
      
      // Prepare the form data
      const formData = {
        summary: data.summary.trim(),
        description: data.description.trim(),
        employeeId: data.employeeId,
        priority: data.priority || 'Low',
      };
      
      const result = await createIdea(formData);
      
      if (result.success) {
        setIsSuccess(true);
        // Reset form
        reset();
        if (onSuccess) {
          onSuccess();
        } else {
          // If no onSuccess callback, redirect to home after a short delay
          setTimeout(() => {
            router.push('/');
          }, 1500);
        }
      } else {
        setSubmitError(result.error || 'Failed to create idea');
      }
    } catch (error) {
      console.error('Error creating idea:', error);
      setSubmitError('An unexpected error occurred. Please try again.');
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
    label: `${employee.firstName} ${employee.lastName}`,
  }));
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-gray-900">
      <div className="space-y-2">
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
          Summary <span className="text-red-500">*</span>
        </label>
        <Input
          {...register('summary', { 
            required: 'Summary is required',
            minLength: { value: 10, message: 'Summary must be at least 10 characters' }
          })}
          error={errors.summary?.message}
          aria-invalid={errors.summary ? 'true' : 'false'}
        />
        {errors.summary && (
          <p className="mt-1 text-sm text-red-600">{errors.summary.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description <span className="text-red-500">*</span>
        </label>
        <TextArea
          {...register('description', { 
            required: 'Description is required',
            minLength: { value: 20, message: 'Description must be at least 20 characters' }
          })}
          rows={6}
          error={errors.description?.message}
          aria-invalid={errors.description ? 'true' : 'false'}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
          Submitted By <span className="text-red-500">*</span>
        </label>
        <div className="mt-1">
          <Controller
            name="employeeId"
            control={control}
            rules={{ required: 'Employee is required' }}
            render={({ field }) => (
              <Select
                id="employeeId"
                options={employeeOptions}
                value={field.value}
                onChange={(value) => field.onChange(value)}
                placeholder="Select an employee"
                error={errors.employeeId?.message}
                className="w-full"
              />
            )}
          />
        </div>
        {errors.employeeId && (
          <p className="mt-1 text-sm text-red-600">{errors.employeeId.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
          Priority
        </label>
        <div className="mt-1">
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <Select
                id="priority"
                options={priorityOptions}
                value={field.value}
                onChange={(value) => field.onChange(value)}
                className="w-full"
              />
            )}
          />
        </div>
      </div>
      <p className="text-xs text-gray-500">
        Priority defaults to Low if not specified
      </p>
      
      {/* Success and Error Messages */}
      {isSuccess && (
        <div className="p-4 text-green-700 bg-green-100 rounded-md">
          Idea submitted successfully! Redirecting...
        </div>
      )}
      
      {submitError && (
        <div className="p-4 text-red-700 bg-red-100 rounded-md">
          {submitError}
        </div>
      )}
      
      <div className="flex justify-end space-x-3 pt-6">
        <Button
          type="button"
          variant="secondary"
          onClick={() => onSuccess ? onSuccess() : router.back()}
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Idea'}
        </Button>
      </div>
    </form>
  );
}
