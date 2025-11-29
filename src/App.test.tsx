import { render } from './test-utils';
import App from './App';

jest.mock('../README.md', () => ({
  text: jest.fn().mockResolvedValue('hello world'),
}));

test('renders home page', async () => {
  const { getByTestId, findByText } = render(<App />);
  expect(getByTestId('MockReactMarkdown')).toBeInTheDocument();
  await findByText('hello world');
});
