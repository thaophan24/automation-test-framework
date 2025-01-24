import { executeTestRun } from './core/executors/testRunExecutor';
import { generateTestRunReport } from './core/utils/reportGenerator';
import { logInfo } from './core/utils/logger';

(async () => {
    const stories = ['US123', 'US456']; // List of stories to run
    for (const storyId of stories) {
        logInfo(`Executing test run for story: ${storyId}`);
        const result = await executeTestRun(storyId);
        generateTestRunReport(result);
    }
})();
