import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Like from "../Like";

test("The heart color changes after Like is clicked", () => {
  render(<Like id="fakeID"/>);

  const likeButon = screen.getByTestId("likeButton");
  fireEvent.click(likeButon);

  // SVG Heart icon appears
  expect(likeButon.innerHTML).toContain("MuiSvgIcon-root");
});

afterEach(() => {
  cleanup();
});
