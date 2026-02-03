import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock fetch for tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);

test('renders TODO App heading', async () => {
  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

test('should delete a todo when delete button is clicked', async () => {
  const testQueryClient = createTestQueryClient();
  
  // Mock initial fetch to return a todo
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        { id: 1, title: 'Test Todo', completed: false }
      ]),
    })
  );

  const { getByRole } = render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for todo to appear
  await screen.findByText('Test Todo');

  // Mock DELETE request
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    })
  );

  // Mock refetch to return empty array
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );

  // Click delete button
  const deleteButton = getByRole('button', { name: /delete/i });
  deleteButton.click();

  // Verify DELETE was called with relative URL
  expect(global.fetch).toHaveBeenCalledWith(
    '/api/todos/1',
    { method: 'DELETE' }
  );
});

test('should display correct stats for items left and completed', async () => {
  const testQueryClient = createTestQueryClient();
  
  // Mock fetch to return mixed todos
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        { id: 1, title: 'Todo 1', completed: false },
        { id: 2, title: 'Todo 2', completed: true },
        { id: 3, title: 'Todo 3', completed: false },
        { id: 4, title: 'Todo 4', completed: true },
      ]),
    })
  );

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for todos to load
  await screen.findByText('Todo 1');

  // Check stats - 2 items left, 2 completed
  expect(screen.getByText('2 items left')).toBeInTheDocument();
  expect(screen.getByText('2 completed')).toBeInTheDocument();
});

test('should display empty state message when no todos exist', async () => {
  const testQueryClient = createTestQueryClient();
  
  // Mock fetch to return empty array
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for loading to complete and check for empty state message
  await screen.findByText(/no todos yet/i);
  expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
});

test('should display error message when fetching todos fails', async () => {
  const testQueryClient = createTestQueryClient();
  
  // Mock fetch to reject
  global.fetch.mockImplementationOnce(() =>
    Promise.reject(new Error('Network error'))
  );

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for error message to appear
  await screen.findByText(/failed to load todos/i);
  expect(screen.getByText(/failed to load todos/i)).toBeInTheDocument();
});

test('should handle API URL as relative path', () => {
  // This test verifies the API_URL should be relative, not hardcoded
  const testQueryClient = createTestQueryClient();
  
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Verify fetch is called with relative URL (not hardcoded localhost)
  expect(global.fetch).toHaveBeenCalledWith('/api/todos');
});

afterEach(() => {
  jest.clearAllMocks();
});
