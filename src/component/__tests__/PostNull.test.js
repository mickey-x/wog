import { render, cleanup } from "@testing-library/react";
import Post from '../Post';

test('Post does not contain username & post image yet', () => {
  // When there's no valid post id & post object, Post should not render username,
  // image & other elements
  const { container } = render(<Post />);
  
  const nullPostUsername = container.querySelector(".post-username");
  const nullPostImage = container.querySelector(".post-image");
  
  expect(nullPostUsername).toBeNull();
  expect(nullPostImage).toBeNull();
})

afterEach(() => {
  cleanup();
});
