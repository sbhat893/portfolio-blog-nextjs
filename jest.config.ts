import { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^.+\\.(css|scss|sass)$": "identity-obj-proxy", // Mock CSS modules
    "^next/image$": "<rootDir>/__mocks__/nextImageMock.ts", // Mock Next.js Image
  },
  transformIgnorePatterns: [
    "/node_modules/(?!next)/", // Ensures Next.js modules are transformed
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
