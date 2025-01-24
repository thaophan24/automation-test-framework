// src/core/utils/schemaValidator.ts
import Ajv from 'ajv';

const ajv = new Ajv();

export const validateUITestCase = (testCase: any): boolean => {
    const schema = {
        type: 'object',
        properties: {
            testCaseId: { type: 'string' },
            testCaseName: { type: 'string' },
            priority: { type: 'string', enum: ['Critical', 'High', 'Medium', 'Low'] },
            testSteps: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        stepNumber: { type: 'number' },
                        action: { type: 'string', enum: ['click', 'fill', 'select'] },
                        selectorType: { type: 'string', enum: ['id', 'class', 'name', 'aria-label', 'xpath'] },
                        selectorValue: { type: 'string' },
                        data: { type: 'string' }
                    },
                    required: ['stepNumber', 'action', 'selectorType', 'selectorValue']
                }
            },
            isActive: { type: 'boolean' }
        },
        required: ['testCaseId', 'testCaseName', 'priority', 'testSteps', 'isActive']
    };

    const validate = ajv.compile(schema);
    return validate(testCase);
};
