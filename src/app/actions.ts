'use server'

import fs from 'fs/promises'
import path from 'path'
import { Idea, IdeaFormData, SearchParams, IdeaWithEmployee, Employee } from '@/types'

const IDEAS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'ideas.json')
const EMPLOYEES_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'employees.json')

// Helper function to read ideas from the JSON file
async function readIdeas(): Promise<Idea[]> {
  try {
    const data = await fs.readFile(IDEAS_FILE_PATH, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading ideas file:', error)
    return []
  }
}

// Helper function to write ideas to the JSON file
async function writeIdeas(ideas: Idea[]): Promise<void> {
  try {
    await fs.writeFile(IDEAS_FILE_PATH, JSON.stringify(ideas, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error writing ideas file:', error)
    throw new Error('Failed to write ideas to file')
  }
}

// Get all employees
export async function getEmployees() {
  try {
    const data = await fs.readFile(EMPLOYEES_FILE_PATH, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading employees file:', error)
    return []
  }
}

// Get ideas with pagination and search
export async function getIdeas({ page = 1, limit = 20, query = '' }: SearchParams) {
  // Convert page to number if it's a string
  const pageNum = typeof page === 'string' ? parseInt(page, 10) : page;
  if (isNaN(pageNum)) throw new Error('Invalid page number');
  
  const ideas = await readIdeas();
  
  // Filter ideas by search query if provided
  const filteredIdeas = query 
    ? ideas.filter(idea => 
        idea.summary.toLowerCase().includes(query.toLowerCase()) || 
        idea.description.toLowerCase().includes(query.toLowerCase())
      )
    : ideas;
  
  // Sort ideas by upvotes in descending order
  const sortedIdeas = [...filteredIdeas].sort((a, b) => b.upvotes - a.upvotes);
  
  // Calculate pagination
  const startIndex = (pageNum - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedIdeas = sortedIdeas.slice(startIndex, endIndex);
  
  return {
    ideas: paginatedIdeas,
    totalIdeas: filteredIdeas.length,
    totalPages: Math.ceil(filteredIdeas.length / limit),
    currentPage: page
  }
}

// Get a single idea by ID with employee details
export async function getIdeaById(id: string): Promise<IdeaWithEmployee | null> {
  try {
    const ideas = await readIdeas();
    const employees = await getEmployees();
    
    const idea = ideas.find(idea => idea.id === id);
    if (!idea) return null;
    
    const employee = employees.find((emp: Employee) => emp.id === idea.employeeId);
    
    return {
      idea,
      employee: employee || null
    };
  } catch (error) {
    console.error('Error getting idea by ID:', error);
    return null;
  }
}

// Create a new idea
export async function createIdea(formData: IdeaFormData) {
  try {
    const ideas = await readIdeas()
    
    const newIdea: Idea = {
      id: Date.now().toString(),
      summary: formData.summary,
      description: formData.description,
      employeeId: formData.employeeId,
      priority: formData.priority || 'Low',
      upvotes: 0,
      downvotes: 0,
      createdAt: new Date().toISOString()
    }
    
    // Add the new idea to the beginning of the array
    const updatedIdeas = [newIdea, ...ideas];
    await writeIdeas(updatedIdeas);
    
    return { success: true, idea: newIdea };
  } catch (error) {
    console.error('Error creating idea:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create idea' 
    };
  }
}

// Vote on an idea (upvote or downvote)
export async function voteOnIdea(id: string, voteType: 'upvote' | 'downvote') {
  const ideas = await readIdeas()
  const ideaIndex = ideas.findIndex(idea => idea.id === id)
  
  if (ideaIndex === -1) {
    throw new Error('Idea not found')
  }
  
  const updatedIdeas = [...ideas]
  
  if (voteType === 'upvote') {
    updatedIdeas[ideaIndex] = {
      ...updatedIdeas[ideaIndex],
      upvotes: updatedIdeas[ideaIndex].upvotes + 1
    }
  } else {
    updatedIdeas[ideaIndex] = {
      ...updatedIdeas[ideaIndex],
      downvotes: updatedIdeas[ideaIndex].downvotes + 1
    }
  }
  
  await writeIdeas(updatedIdeas)
  return updatedIdeas[ideaIndex]
}

// Delete an idea
export async function deleteIdea(id: string) {
  const ideas = await readIdeas()
  const updatedIdeas = ideas.filter(idea => idea.id !== id)
  
  if (updatedIdeas.length === ideas.length) {
    throw new Error('Idea not found')
  }
  
  await writeIdeas(updatedIdeas)
  return { success: true }
}
