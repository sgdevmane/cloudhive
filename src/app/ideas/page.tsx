import { getEmployees } from '@/app/actions';
import { IdeaForm } from '@/components/IdeaForm';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export default async function NewIdeaPage() {
  const employees = await getEmployees();
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:underline flex items-center">
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
            className="mr-1"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Ideas
        </Link>
      </div>
      
      <Card>
        <Card.Header>
          <Card.Title>Submit New Idea</Card.Title>
          <Card.Description>
            Share your feature idea for Integration Hub
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <IdeaForm employees={employees} />
        </Card.Content>
      </Card>
    </div>
  );
}
