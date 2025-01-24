# automation-test-framework

```aiignore
automation-framework/
├── src/
│   ├── core/
│   │   ├── executors/
│   │   │   └── testRunExecutor.ts          # Handles execution of test cases for stories
│   │   ├── generators/
│   │   │   ├── uiTestCaseGenerator.ts      # Schema for UI test cases
│   │   │   ├── apiTestCaseGenerator.ts     # Schema for API test cases
│   │   │   ├── uiTestScriptGenerator.ts    # Generates UI test scripts dynamically
│   │   │   ├── apiTestScriptGenerator.ts   # Generates API test scripts dynamically
│   │   ├── pages/
│   │   │   └── LoginPage.ts                # Example Page Object for UI testing
│   │   ├── utils/
│   │   │   ├── schemaValidator.ts          # Validates UI and API test case schemas
│   │   │   ├── fileHandler.ts              # File handling utilities (read/write JSON)
│   │   │   ├── logger.ts                   # Centralized logging
│   │   │   ├── reportGenerator.ts          # Generates JSON and HTML reports
│   │   │   ├── configManager.ts            # Manages environment configurations
│   │   │   └── chatGPTHelper.ts            # ChatGPT API integration for generating test cases
│   ├── test-case-details/
│   │   ├── test-ui-cases.json              # UI test case definitions
│   │   ├── test-api-cases.json             # API test case definitions
│   │   ├── ui-requirements.txt             # Input for generating UI test cases via ChatGPT
│   │   └── api-requirements.txt            # Input for generating API test cases via ChatGPT
│   ├── tests/
│   │   ├── UI001.spec.ts                   # Generated UI test script
│   │   ├── API001.spec.ts                  # Generated API test script
│   │   └── ...                             # Additional test scripts
│   ├── reports/
│   │   ├── US123-test-run-report.json      # JSON report for story US123
│   │   ├── US123-test-run-report.html      # HTML report for story US123
│   │   └── ...                             # Additional reports
│   └── index.ts                            # Main entry point for running test runs
├── config.json                              # Environment configurations
├── package.json                             # Project dependencies and scripts
├── tsconfig.json                            # TypeScript configuration
└── playwright.config.ts                     # Playwright test runner configuration

```