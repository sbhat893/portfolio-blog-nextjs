"use client"; // Context must be in a Client Component

import { createContext, useContext } from "react";

// Define the context type
const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ data, children }: { data: any; children: React.ReactNode }) => {
  return <PortfolioContext.Provider value={data}>{children}</PortfolioContext.Provider>;
};

// Custom hook to use the context
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
