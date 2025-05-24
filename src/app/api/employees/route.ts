import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { Employee } from '@/types';

const EMPLOYEES_FILE_PATH = path.join(process.cwd(), 'src/data/employees.json');

export async function GET() {
  try {
    const data = await fs.readFile(EMPLOYEES_FILE_PATH, 'utf-8');
    const employees: Employee[] = JSON.parse(data);
    
    // Ensure all employees have the required fields
    const validatedEmployees = employees.map(emp => ({
      id: emp.id,
      firstName: emp.firstName || emp.name?.split(' ')[0] || '',
      lastName: emp.lastName || emp.name?.split(' ').slice(1).join(' ') || '',
      name: emp.name || `${emp.firstName || ''} ${emp.lastName || ''}`.trim(),
      profileImage: emp.profileImage || '',
      department: emp.department || 'Unassigned'
    }));
    
    return NextResponse.json(validatedEmployees);
  } catch (error) {
    console.error('Error reading employees file:', error);
    return NextResponse.json(
      { error: 'Failed to fetch employees' },
      { status: 500 }
    );
  }
}
