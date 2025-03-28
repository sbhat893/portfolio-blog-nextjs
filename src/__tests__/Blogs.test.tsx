/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Blogs from "@/app/blogs/page"; 
import { act } from "@testing-library/react";

beforeEach(() => {
  fetchMock.resetMocks();
});

test("renders blog page", async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify([
      { id: "1", title: "Test Blog 1", summary: "Summary 1" },
      { id: "2", title: "Test Blog 2", summary: "Summary 2" },
    ])
  );
  await act(async () => {
    render(<Blogs />);
  });
  expect(screen.getByText(/Blog Posts/i)).toBeInTheDocument();
});
