// src/core/generators/uiTestScriptGenerator.ts
import fs from 'fs';
import { UITestCase } from './uiTestCaseGenerator';

export const generateUITestScript = (testCase: UITestCase): void => {
    const steps = testCase.testSteps.map((step) => {
        switch (step.action) {
            case 'click':
                return `await page.click('${step.selectorType}=${step.selectorValue}');`;
            case 'fill':
                return `await page.fill('${step.selectorType}=${step.selectorValue}', '${step.data}');`;
            default:
                throw new Error(`Unsupported action: ${step.action}`);
        }
    });

    const scriptContent = `
    import { test, expect } from '@playwright/test';

    test('${testCase.testCaseName}', async ({ page }) => {
      // Preconditions: ${testCase.preconditions || 'None'}
      ${steps.join('\n      ')}

      // Expected State: ${testCase.expectedUIState || 'Not defined'}
    });
  `;

    const filePath = `./src/tests/${testCase.testCaseId}.spec.ts`;
    fs.writeFileSync(filePath, scriptContent, 'utf8');
    console.log(`UI Test script generated: ${filePath}`);
};
