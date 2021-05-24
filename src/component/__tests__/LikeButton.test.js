import { render, screen, cleanup } from "@testing-library/react";
import Like from "../Like";

test('Like button should render', () => {
  render(<Like />);
  const likeBtnHandle = screen.getByTestId("likeButton");
  expect(likeBtnHandle).toBeInTheDocument();
})
  
afterEach(() => {
  cleanup();   
})