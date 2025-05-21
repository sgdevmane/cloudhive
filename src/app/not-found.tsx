import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-gray-600 mb-8">
        The resource you are looking for does not exist.
      </p>
      <Link href="/">
        <Button variant="primary">Return to Ideas Dashboard</Button>
      </Link>
    </div>
  );
}
