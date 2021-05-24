import { render, screen, cleanup } from "@testing-library/react";
import Follow from "../Follow"

test("Follow user box should be in the document", () => {
  render(<Follow />);
  const userBox = screen.getByTestId("test-userDescription");
  expect(userBox).toBeInTheDocument();
});

afterEach(() => {
  cleanup();
});
