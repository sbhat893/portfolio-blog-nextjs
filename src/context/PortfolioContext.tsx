"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the shape of portfolio data
interface PortfolioData {
  name: string;
  description?: string;
  profilePicture: string;
  cvPath: string;
}

// Define the shape of the context value
interface PortfolioContextType {
  data: PortfolioData | null;
  loading: boolean;
  error: string | null;
}

// Create context with a proper default value
const PortfolioContext = createContext<PortfolioContextType>({
  data: null,
  loading: true,
  error: null,
});

// Define props for PortfolioProvider
type PortfolioProviderProps = {
  initialData: PortfolioData;
  children: ReactNode;
};

export const PortfolioProvider = ({ initialData, children }: PortfolioProviderProps) => {
  const [data, setData] = useState<PortfolioData | null>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialData) {
      fetch("/api/portfolio")
        .then((res) => res.json())
        .then((portfolioData) => {
          setData(portfolioData);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [initialData]);

  return (
    <PortfolioContext.Provider value={{ data, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  return useContext(PortfolioContext);
};
