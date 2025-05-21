# CloudHive Feature Idea Portal

A web application for CloudHive employees to propose, explore, and vote on feature ideas for the Integration Hub product. This project is built with Next.js 15, React 19, TypeScript, and TailwindCSS.

## Features

- **Idea Submission Form**: Employees can submit new feature ideas with a summary, description, employee information, and priority level.
- **Idea List & Voting System**: Browse a stacked list of submitted ideas, sorted by upvotes. Each idea displays the summary, submitting employee, and vote counts.
- **Idea Exploration**: View the full details of any idea by clicking the "View Details" button.
- **Search Functionality**: Quickly find specific ideas using the search bar to filter by keywords in the summary or description.
- **Pagination**: The idea list is paginated to display 20 ideas per page for better performance and usability.
- **Visual Appeal**: Clean, modern UI design that promotes engagement.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Geist, a custom font for better typography.

## Technical Implementation

### Tech Stack

- **Framework**: Next.js 15 with React 19
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Form Management**: react-hook-form
- **UI Components**: Custom components built on top of RadixUI primitives
- **Data Fetching**: Server Actions for all data interactions
- **Routing**: Next.js App Router

### Project Structure

- `/src/app`: Main application pages and server actions
- `/src/components`: Reusable UI components
- `/src/components/ui`: Base UI components (Button, Card, Input, etc.)
- `/src/data`: JSON files for storing employees and ideas
- `/src/types`: TypeScript type definitions

### Data Handling

The application uses server actions to handle all data operations, including:

- Fetching ideas with pagination and search
- Submitting new ideas
- Upvoting and downvoting ideas
- Deleting ideas

All data is stored in JSON files located in the `/src/data` directory.
