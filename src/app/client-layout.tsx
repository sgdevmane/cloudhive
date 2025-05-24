'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Providers } from './providers';

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <header className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold text-blue-600 hover:text-blue-700"
            >
              CloudHive Feature Portal
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-blue-600">
                Ideas
              </Link>
              <Link
                href="/ideas/new"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Submit Idea
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 bg-gray-50">
        {children}
      </main>
      <footer className="bg-gray-50 border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} CloudHive. All rights reserved.
        </div>
      </footer>
    </Providers>
  );
}
