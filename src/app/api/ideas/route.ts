import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

const IDEAS_FILE_PATH = path.join(process.cwd(), 'src/data/ideas.json');

export async function POST(request: Request) {
  try {
    // Read the existing ideas
    const data = await fs.readFile(IDEAS_FILE_PATH, 'utf-8');
    const ideas = JSON.parse(data);
    
    // Parse the request body
    const newIdea = await request.json();
    
    // Create a new idea with required fields
    const idea = {
      id: Date.now().toString(),
      summary: newIdea.summary,
      description: newIdea.description,
      employeeId: newIdea.employeeId,
      priority: newIdea.priority || 'Low',
      upvotes: 0,
      downvotes: 0,
      createdAt: new Date().toISOString(),
    };
    
    // Add the new idea to the array
    ideas.push(idea);
    
    // Write the updated ideas back to the file
    await fs.writeFile(IDEAS_FILE_PATH, JSON.stringify(ideas, null, 2));
    
    return NextResponse.json(idea, { status: 201 });
  } catch (error) {
    console.error('Error creating idea:', error);
    return NextResponse.json(
      { error: 'Failed to create idea' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const data = await fs.readFile(IDEAS_FILE_PATH, 'utf-8');
    const ideas = JSON.parse(data);
    return NextResponse.json(ideas);
  } catch (error) {
    console.error('Error reading ideas file:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ideas' },
      { status: 500 }
    );
  }
}
