import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Adjust based on your project structure
    "^.+\\.(css|scss|sass|less)$": "identity-obj-proxy", // Mock CSS files
    "next/image": "<rootDir>/__mocks__/nextImageMock.ts", // Mock Next.js Image
    "next/link": "<rootDir>/__mocks__/nextLinkMock.ts", // Mock Next.js Link
  },
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }],
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"], // Ensure node_modules are not transformed
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Setup file for Jest
};

export default config;
