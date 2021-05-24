import { render, cleanup } from "@testing-library/react";
import Post from "../Post";

test("Post will be valid with a valid post ID", () => {
  const dummyPostObj = {
    id: "123412427490",
    post: {
      comments: [],
      description: "test description",
      image: "test image",
      likes: "5",
      location: "test location",
      timestamp: "July 2, 2021",
      username: "testUsername",
    },
  };

  
  const { postObject } = render(
    <Post id={dummyPostObj.id} post={dummyPostObj} />
  );

  expect(postObject).not.toBeNull();
});

afterEach(() => {
  cleanup();
});
