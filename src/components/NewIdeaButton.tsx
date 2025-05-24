'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function NewIdeaButton() {
  return (
    <Link href="/ideas/new">
      <Button variant="primary">
        Submit New Idea
      </Button>
    </Link>
  );
}
