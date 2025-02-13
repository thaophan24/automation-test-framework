import { Configuration, OpenAIApi } from 'openai';

export async function generateTestCases(prompt: string, designImage?: Buffer, domHtml?: string) {
    const configuration = new Configuration({ apiKey: process.env.OPENAI_KEY });
    const openai = new OpenAIApi(configuration);

    const messages = [
        {
            role: "system",
            content: "Generate test cases in JSON format based on the following inputs:"
        },
        { role: "user", content: prompt },
        { role: "user", content: domHtml }
    ];

    if (designImage) {
        messages.push({
            role: "user",
            content: designImage.toString('base64')
        });
    }

    const response = await openai.createChatCompletion({
        model: "gpt-4-vision-preview",
        messages,
        temperature: 0.7,
    });

    return JSON.parse(response.data.choices[0].message.content);
}
