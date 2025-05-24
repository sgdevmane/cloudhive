import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

const EMPLOYEES_FILE_PATH = path.join(process.cwd(), 'src/data/employees.json');

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await fs.readFile(EMPLOYEES_FILE_PATH, 'utf-8');
    const employees = JSON.parse(data);
    const employee = employees.find((emp: any) => emp.id === params.id);
    
    if (!employee) {
      return NextResponse.json(
        { error: 'Employee not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(employee);
  } catch (error) {
    console.error('Error reading employees file:', error);
    return NextResponse.json(
      { error: 'Failed to fetch employee' },
      { status: 500 }
    );
  }
}
