import {defineConfig} from '@playwright/test';

export default defineConfig({
    testDir: './src/tests/e2e',
    timeout: 30 * 1000, // 30 seconds timeout
    retries: 2, // Retry on failure
    use: {
        headless: true, // Run tests in headless mode
        viewport: {width: 1280, height: 720},
        actionTimeout: 10 * 1000, // Maximum time for actions like click
        baseURL: 'https://example.com',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: {browserName: 'chromium'},
        },
        {
            name: 'firefox',
            use: {browserName: 'firefox'},
        },
        {
            name: 'webkit',
            use: {browserName: 'webkit'},
        },
    ],
    reporter: [['list'], ['html', {outputFolder: 'reports/playwright/html-report'}]],
});
