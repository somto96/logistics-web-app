import { render } from '@testing-library/react';
import { Hello } from './Hello';

it("renders 'Hello World!'", () => {
  render(<Hello />);
});
