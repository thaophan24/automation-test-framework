import { StoryTestRunResult } from '../core/executors/testRunExecutor';
import { writeToFile } from './fileHandler';

export const generateTestRunReport = (result: StoryTestRunResult): void => {
    const reportFilePath = `./reports/${result.storyId}-test-run-report.json`;
    writeToFile(reportFilePath, JSON.stringify(result, null, 2));
    console.log(`Test run report saved at: ${reportFilePath}`);
};
