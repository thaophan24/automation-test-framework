// src/core/generators/uiTestCaseGenerator.ts
export interface UITestStep {
    stepNumber: number;
    action: 'click' | 'fill' | 'select';
    selectorType: 'id' | 'class' | 'name' | 'aria-label' | 'xpath';
    selectorValue: string;
    data?: string;
}

export interface UITestCase {
    testCaseId: string;
    testCaseName: string;
    priority: 'Critical' | 'High' | 'Medium' | 'Low';
    storyId?: string;
    preconditions?: string;
    testSteps: UITestStep[];
    expectedUIState?: string;
    isRegression: boolean;
    isActive: boolean;
    createdDate: Date;
    updatedDate?: Date;
    updatedVersion?: string;
}
