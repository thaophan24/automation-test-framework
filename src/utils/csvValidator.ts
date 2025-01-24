import Ajv from 'ajv';

const ajv = new Ajv();

export const validateUIRow = (row: any): boolean => {
    const uiRowSchema = {
        type: 'object',
        properties: {
            testCaseId: { type: 'string' },
            testCaseName: { type: 'string' },
            priority: { type: 'string', enum: ['Critical', 'High', 'Medium', 'Low'] },
            storyId: { type: 'string' },
            stepNumber: { type: 'integer' },
            action: { type: 'string', enum: ['click', 'fill', 'select'] },
            selectorType: { type: 'string', enum: ['id', 'class', 'name', 'aria-label', 'xpath'] },
            selectorValue: { type: 'string' },
            data: { type: ['string', 'null'] },
            expectedUIState: { type: 'string' },
            isActive: { type: 'boolean' },
        },
        required: [
            'testCaseId',
            'testCaseName',
            'priority',
            'storyId',
            'stepNumber',
            'action',
            'selectorType',
            'selectorValue',
            'isActive',
        ],
        additionalProperties: false,
    };

    const validate = ajv.compile(uiRowSchema);
    return validate(row);
};

export const validateAPIRow = (row: any): boolean => {
    const apiRowSchema = {
        type: 'object',
        properties: {
            testCaseId: { type: 'string' },
            testCaseName: { type: 'string' },
            priority: { type: 'string', enum: ['Critical', 'High', 'Medium', 'Low'] },
            storyId: { type: 'string' },
            endpoint: { type: 'string' },
            method: { type: 'string', enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] },
            headers: { type: ['string', 'null'] }, // JSON string
            body: { type: ['string', 'null'] }, // JSON string
            expectedStatusCode: { type: 'integer' },
            expectedResponseBody: { type: ['string', 'null'] }, // JSON string
            isActive: { type: 'boolean' },
        },
        required: [
            'testCaseId',
            'testCaseName',
            'priority',
            'storyId',
            'endpoint',
            'method',
            'expectedStatusCode',
            'isActive',
        ],
        additionalProperties: false,
    };

    const validate = ajv.compile(apiRowSchema);
    return validate(row);
};
