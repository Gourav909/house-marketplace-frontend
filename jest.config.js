module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.jsx", "src/**/*.js"],
  modulePaths: ["<rootDir>/"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.svg$": "<rootDir>/svgTransform.js",
    "\\.(css|less|scss|sass)$": "<rootDir>/src/test/jest/_mocks_/styleMock.js",
  },
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["js", "jsx", "json"],
  transformIgnorePatterns: ["node_modules/(?!(axios|react-toastify))"],
  setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
  watchPathIgnorePatterns: ["<rootDir>/node_modules"],
  testEnvironment: "jsdom",
};
