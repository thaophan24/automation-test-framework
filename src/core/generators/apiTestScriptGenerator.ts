// src/core/generators/apiTestScriptGenerator.ts
import fs from 'fs';
import { APITestCase } from './apiTestCaseGenerator';

export const generateAPITestScript = (testCase: APITestCase): void => {
    const scriptContent = `
    import { test, expect } from '@playwright/test';

    test('${testCase.testCaseName}', async () => {
      const response = await fetch('${testCase.request.endpoint}', {
        method: '${testCase.request.method}',
        headers: ${JSON.stringify(testCase.request.headers || {})},
        body: ${JSON.stringify(testCase.request.body || null)}
      });

      const responseBody = await response.json();

      expect(response.status).toBe(${testCase.expectedResponse.statusCode});
      expect(responseBody).toMatchObject(${JSON.stringify(testCase.expectedResponse.responseBody || {})});
    });
  `;

    const filePath = `./src/tests/${testCase.testCaseId}.spec.ts`;
    fs.writeFileSync(filePath, scriptContent, 'utf8');
    console.log(`API Test script generated: ${filePath}`);
};
