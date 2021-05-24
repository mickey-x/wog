import { render, screen, cleanup } from "@testing-library/react";
import Comment from "../Comment";

test('Submit comment button should show up', () => {
  render(<Comment />);
  const submitButton = screen.getByTestId("addCommentButton");
  expect(submitButton).toBeInTheDocument();
})

test('Comment texbox should have value', () => {
  render(<Comment />);
  const commentText = screen.getByTestId("commentingBox").setAttribute("value", "This is a comment");
  expect(commentText).not.toBeNull();
})

afterEach(() => {
  cleanup();
});