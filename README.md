# CloudHive Feature Idea Portal

A web application for CloudHive employees to propose, explore, and vote on feature ideas for the Integration Hub product. This project is built with Next.js 15, React 19, TypeScript, and TailwindCSS.

## Features

- **Idea Submission Form**: Employees can submit new feature ideas with a summary, description, employee information, and priority level.
- **Real-time Voting System**: Intuitive upvote/downvote functionality with immediate UI feedback.
- **Idea List & Exploration**: Browse a responsive grid of submitted ideas with the ability to view full details.
- **Search & Filtering**: Quickly find specific ideas using the search functionality.
- **Pagination**: The idea list is paginated to display 20 ideas per page for better performance.
- **Responsive Design**: Fully responsive UI that works on desktop and mobile devices.
- **Loading States**: Smooth loading indicators and error handling for better UX.
- **Optimistic Updates**: Immediate UI updates when interacting with the application.
- - **Idea List & Voting System**: Browse a stacked list of submitted ideas, sorted by upvotes. Each idea displays the summary, submitting employee, and vote counts.
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
- **State Management**: TanStack Query (React Query) for server state
- **Form Management**: react-hook-form
- **UI Components**: Custom components built on top of RadixUI primitives
- **Data Fetching**: Server Actions with TanStack Query for data synchronization
- **Routing**: Next.js App Router with client-side navigation
- **Type Safety**: Full TypeScript support throughout the application

### Project Structure

- `/src/app`: Main application pages and server actions
- `/src/components`: Reusable UI components
- `/src/components/ui`: Base UI components (Button, Card, Input, etc.)
- `/src/data`: JSON files for storing employees and ideas
- `/src/types`: TypeScript type definitions

### Data Handling & State Management

The application uses a combination of Server Actions and TanStack Query for optimal data management:

- **Server Actions** for all data mutations:
  - Submitting new ideas
  - Upvoting and downvoting ideas
  - Deleting ideas

- **TanStack Query** for:
  - Server state management
  - Automatic background refetching
  - Optimistic updates
  - Request deduplication
  - Pagination and infinite query support
  - Automatic retries on failure

### Performance Optimizations

- **Code Splitting**: Automatic code splitting by Next.js
- **Client-side Navigation**: Faster page transitions using Next.js Link component
- **Optimistic UI**: Immediate feedback for user actions
- **Efficient Data Fetching**: Only fetches data when needed with proper caching
- **Suspense Boundaries**: For better loading states

### Error Handling

- Comprehensive error boundaries
- User-friendly error messages
- Automatic retries for failed requests
- Loading states for better UX during data fetching

### Development

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

Then start the production server:

```bash
npm start
# or
yarn start
# or
pnpm start
```

### Testing

Run the test suite:

```bash
npm test
# or
yarn test
# or
pnpm test
```

### Linting and Formatting

```bash
# Run ESLint
npm run lint
# or
yarn lint
# or
pnpm lint

# Format code with Prettier
npm run format
# or
yarn format
# or
pnpm format
```
