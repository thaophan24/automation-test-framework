import { parseCSV } from './csvParser';
import { validateUIRow, validateAPIRow } from './csvValidator';

export const convertUICSVToJSON = async (filePath: string): Promise<any[]> => {
    const rows = await parseCSV(filePath);
    const validRows = rows.filter((row) => validateUIRow(row));
    if (validRows.length !== rows.length) {
        console.error('Some UI test case rows are invalid.');
    }
    return validRows.map((row) => ({
        testCaseId: row.testCaseId,
        testCaseName: row.testCaseName,
        priority: row.priority,
        storyId: row.storyId,
        preconditions: row.preconditions || null,
        testSteps: [
            {
                stepNumber: Number(row.stepNumber),
                action: row.action,
                selectorType: row.selectorType,
                selectorValue: row.selectorValue,
                data: row.data || null,
            },
        ],
        expectedUIState: row.expectedUIState || null,
        isActive: row.isActive === 'true',
    }));
};

export const convertAPICSVToJSON = async (filePath: string): Promise<any[]> => {
    const rows = await parseCSV(filePath);
    const validRows = rows.filter((row) => validateAPIRow(row));
    if (validRows.length !== rows.length) {
        console.error('Some API test case rows are invalid.');
    }
    return validRows.map((row) => ({
        testCaseId: row.testCaseId,
        testCaseName: row.testCaseName,
        priority: row.priority,
        storyId: row.storyId,
        request: {
            endpoint: row.endpoint,
            method: row.method,
            headers: row.headers ? JSON.parse(row.headers) : null,
            body: row.body ? JSON.parse(row.body) : null,
        },
        expectedResponse: {
            statusCode: Number(row.expectedStatusCode),
            responseBody: row.expectedResponseBody ? JSON.parse(row.expectedResponseBody) : null,
        },
        isActive: row.isActive === 'true',
    }));
};
