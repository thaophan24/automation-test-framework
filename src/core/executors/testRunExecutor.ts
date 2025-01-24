import { UITestCase } from '../generators/uiTestCaseGenerator';
import { APITestCase } from '../generators/apiTestCaseGenerator';
import { generateUITestScript } from '../generators/uiTestScriptGenerator';
import { generateAPITestScript } from '../generators/apiTestScriptGenerator';
import { readJSONFile } from '../../utils/fileHandler';
import { logInfo, logError } from '../utils/logger';
import { exec } from 'child_process';

interface TestRunResult {
    testCaseId: string;
    testCaseName: string;
    storyId: string;
    status: 'Passed' | 'Failed' | 'Skipped';
    error?: string;
}

interface StoryTestRunResult {
    storyId: string;
    totalTestCases: number;
    passed: number;
    failed: number;
    skipped: number;
    details: TestRunResult[];
}

export const executeTestRun = async (storyId: string): Promise<StoryTestRunResult> => {
    const uiTestCases: UITestCase[] = readJSONFile('./src/test-case-details/test-ui-cases.json');
    const apiTestCases: APITestCase[] = readJSONFile('./src/test-case-details/test-api-cases.json');

    // Filter test cases by storyId
    const filteredUITestCases = uiTestCases.filter((testCase) => testCase.storyId === storyId && testCase.isActive);
    const filteredAPITestCases = apiTestCases.filter((testCase) => testCase.storyId === storyId && testCase.isActive);

    const testRunResults: TestRunResult[] = [];

    // Execute UI Test Cases
    for (const testCase of filteredUITestCases) {
        try {
            logInfo(`Generating and running UI test case: ${testCase.testCaseId}`);
            generateUITestScript(testCase); // Generate test script
            const status = await runGeneratedTest(`./src/tests/${testCase.testCaseId}.spec.ts`);
            testRunResults.push({ testCaseId: testCase.testCaseId, testCaseName: testCase.testCaseName, storyId, status });
        } catch (error) {
            logError(`Failed to run UI test case: ${testCase.testCaseId}`);
            testRunResults.push({
                testCaseId: testCase.testCaseId,
                testCaseName: testCase.testCaseName,
                storyId,
                status: 'Failed',
                error: error.message,
            });
        }
    }

    // Execute API Test Cases
    for (const testCase of filteredAPITestCases) {
        try {
            logInfo(`Generating and running API test case: ${testCase.testCaseId}`);
            generateAPITestScript(testCase); // Generate test script
            const status = await runGeneratedTest(`./src/tests/${testCase.testCaseId}.spec.ts`);
            testRunResults.push({ testCaseId: testCase.testCaseId, testCaseName: testCase.testCaseName, storyId, status });
        } catch (error) {
            logError(`Failed to run API test case: ${testCase.testCaseId}`);
            testRunResults.push({
                testCaseId: testCase.testCaseId,
                testCaseName: testCase.testCaseName,
                storyId,
                status: 'Failed',
                error: error.message,
            });
        }
    }

    // Summarize results
    const passed = testRunResults.filter((result) => result.status === 'Passed').length;
    const failed = testRunResults.filter((result) => result.status === 'Failed').length;
    const skipped = testRunResults.filter((result) => result.status === 'Skipped').length;

    return {
        storyId,
        totalTestCases: testRunResults.length,
        passed,
        failed,
        skipped,
        details: testRunResults,
    };
};

// Helper function to run generated test scripts
const runGeneratedTest = (testScriptPath: string): Promise<'Passed' | 'Failed'> => {
    return new Promise((resolve, reject) => {
        exec(`npx playwright test ${testScriptPath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Test failed: ${error.message}`);
                return reject('Failed');
            }
            console.log(stdout);
            resolve('Passed');
        });
    });
};
