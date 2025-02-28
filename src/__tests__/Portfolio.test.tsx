import { render, screen, waitFor } from "@testing-library/react";
import Portfolio from "../app/page";

describe("Portfolio Page", () => {
    it("renders the portfolio page correctly", async () => {
      render(<Portfolio />);
  
      // Wait for data to be loaded
      await waitFor(() => expect(screen.getByText("Welcome...")).toBeInTheDocument());
      expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
    });
  
    it("displays the profile image", () => {
      render(<Portfolio />);
      const image = screen.getByAltText("Profile Picture");
      expect(image).toBeInTheDocument();
    });
  
    it("has a working 'Download My CV' button", () => {
      render(<Portfolio />);
      const downloadButton = screen.getByText(/Download My CV/i);
      expect(downloadButton).toBeInTheDocument();
      expect(downloadButton.closest("a")).toHaveAttribute("href", "/my_cv.pdf");
    });
});