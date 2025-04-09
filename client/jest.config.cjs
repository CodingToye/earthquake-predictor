module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}", "!src/**/*.d.ts"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  coveragePathIgnorePatterns: [
    "/index.ts$",
    "/__tests__/fixtures/",
    "/__tests__/utils",
  ],
  testMatch: [
    "**/__tests__/**/*.test.(ts|tsx|js)",
    "**/?(*.)+(spec|test).(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json",
      },
    ],
    "^.+\\.jsx?$": [
      "babel-jest",
      {
        presets: [
          ["@babel/preset-env", {targets: {node: "current"}}],
          "@babel/preset-react",
          ["@babel/preset-typescript", {isTSX: true, allExtensions: true}],
        ],
      },
    ],
  },
  transformIgnorePatterns: [
    "node_modules/(?!react-leaflet|@react-leaflet|leaflet)/",
  ],
};
