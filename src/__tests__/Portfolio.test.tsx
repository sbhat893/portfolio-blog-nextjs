/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from "@testing-library/react";
import Portfolio from "../app/page";
import { PortfolioProvider } from "@/context/PortfolioContext";

// Mock portfolio data
const mockPortfolioData = {
  name: "Sumukh Bhat",
  description: "Software Engineer",
  profilePicture: "profile.jpg",
  cvPath: "my_cv.pdf",
};

describe("Portfolio Page", () => {
    it("renders the portfolio page correctly", async () => {
      render(
        <PortfolioProvider initialData={mockPortfolioData}>
          <Portfolio />
        </PortfolioProvider>
      );
  
      // Wait for data to be loaded
      await waitFor(() => expect(screen.getByText("Welcome...")).toBeInTheDocument());
      expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
    });
  
    it("displays the profile image", () => {
      render(<PortfolioProvider initialData={mockPortfolioData}>
        <Portfolio />
      </PortfolioProvider>);
      const image = screen.getByAltText("Profile Picture");
      expect(image).toBeInTheDocument();
    });
  
    it("has a working 'Download My CV' button", () => {
      render(<PortfolioProvider initialData={mockPortfolioData}>
        <Portfolio />
      </PortfolioProvider>);
      const downloadButton = screen.getByText(/Download My CV/i);
      expect(downloadButton).toBeInTheDocument();
      expect(downloadButton.closest("a")).toHaveAttribute("href", "/my_cv.pdf");
    });
});