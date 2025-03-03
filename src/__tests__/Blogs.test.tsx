import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Blogs from "@/app/blogs/page"; // Adjust path if needed

test("renders blog page", () => {
  render(<Blogs />);
  expect(screen.getByText(/Blog Posts/i)).toBeInTheDocument();
});
