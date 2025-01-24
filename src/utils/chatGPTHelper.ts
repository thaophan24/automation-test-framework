import { OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Load your API key from environment variables
});

const openai = new OpenAIApi(configuration);

export const generateTestCasesFromPrompt = async (prompt: string): Promise<string> => {
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003', // Or GPT-4
            prompt: `
        You are a test automation expert. Based on the following input, generate detailed test cases in JSON format. 
        The test cases should include: testCaseId, testCaseName, priority, preconditions, testSteps, expectedResults, isActive.

        Input: ${prompt}

        Example Output:
        [
          {
            "testCaseId": "UI001",
            "testCaseName": "Verify Login Functionality",
            "priority": "High",
            "preconditions": "User must be logged out.",
            "testSteps": [
              { "stepNumber": 1, "action": "click", "selectorType": "id", "selectorValue": "login-button" },
              { "stepNumber": 2, "action": "fill", "selectorType": "name", "selectorValue": "username", "data": "user1" },
              { "stepNumber": 3, "action": "fill", "selectorType": "name", "selectorValue": "password", "data": "password123" },
              { "stepNumber": 4, "action": "click", "selectorType": "aria-label", "selectorValue": "Submit" }
            ],
            "expectedResults": "User is redirected to the dashboard.",
            "isActive": true
          }
        ]
      `,
            max_tokens: 1000,
        });
        return response.data.choices[0].text?.trim() || '';
    } catch (error) {
        // @ts-ignore
        console.error('Error generating test cases from ChatGPT:', error.message);
        throw error;
    }
};
