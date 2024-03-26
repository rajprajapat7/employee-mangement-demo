module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleDirectories: [
    // "node_modules",
    // +   // add the directory with the test-utils.js file, for example:
    "./specs",
    // +   'utils', // a utility folder
    // +    __dirname, // the root directory
  ],
  // ... other options ...
};
