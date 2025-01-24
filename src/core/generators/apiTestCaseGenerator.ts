// src/core/generators/apiTestCaseGenerator.ts
export interface APIRequest {
    endpoint: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    body?: Record<string, any>;
}

export interface APIResponseValidation {
    statusCode: number;
    responseBody?: Record<string, any>;
    responseHeaders?: Record<string, string>;
}

export interface APITestCase {
    testCaseId: string;
    testCaseName: string;
    priority: 'Critical' | 'High' | 'Medium' | 'Low';
    storyId?: string;
    request: APIRequest;
    expectedResponse: APIResponseValidation;
    isRegression: boolean;
    isActive: boolean;
    createdDate: Date;
    updatedDate?: Date;
    updatedVersion?: string;
}
