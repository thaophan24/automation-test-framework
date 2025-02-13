import { test, expect } from "@playwright/test";
import Jimp from "jimp";
import { OpenAI } from "openai";
import * as fs from "fs";
import * as dotenv from "dotenv";
import axios from "axios";

dotenv.config(); // Load API Key

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Compare two images and generate a third image with highlighted differences.
 * @param imagePath1 - Path to the first image.
 * @param imagePath2 - Path to the second image.
 * @param outputPath - Path to save the highlighted image.
 * @param highlightColor - Color for highlighting differences (default: red).
 * @returns {Promise<boolean>} - Returns true if differences were detected.
 */
async function compareAndHighlightImages(
    imagePath1: string,
    imagePath2: string,
    outputPath: string,
    highlightColor: { r: number; g: number; b: number } = { r: 255, g: 0, b: 0 }
): Promise<boolean> {
    try {
        const img1 = await Jimp.read(imagePath1);
        const img2 = await Jimp.read(imagePath2);

        if (img1.getWidth() !== img2.getWidth() || img1.getHeight() !== img2.getHeight()) {
            throw new Error("Images must have the same dimensions.");
        }

        const width = img1.getWidth();
        const height = img1.getHeight();
        const highlightedImg = img1.clone();
        let differencesDetected = false;
        const threshold = 30; // Difference threshold
        const blurFactor = 2; // Blur factor for noise reduction

        // Convert to grayscale to remove color noise
        img1.grayscale().blur(blurFactor);
        img2.grayscale().blur(blurFactor);

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const color1 = Jimp.intToRGBA(img1.getPixelColor(x, y));
                const color2 = Jimp.intToRGBA(img2.getPixelColor(x, y));

                const diff =
                    Math.abs(color1.r - color2.r) +
                    Math.abs(color1.g - color2.g) +
                    Math.abs(color1.b - color2.b);

                if (diff > threshold) {
                    highlightedImg.setPixelColor(
                        Jimp.rgbaToInt(highlightColor.r, highlightColor.g, highlightColor.b, 255),
                        x,
                        y
                    );
                    differencesDetected = true;
                }
            }
        }

        await highlightedImg.writeAsync(outputPath);
        console.log(`Differences detected and saved at: ${outputPath}`);
        return differencesDetected;
    } catch (error) {
        console.error("Error processing images:", error);
        return false;
    }
}

/**
 * Generates an AI-enhanced image with OpenAI's DALL·E.
 * @param description - Description of the detected differences.
 * @param outputPath - Path to save the AI-generated image.
 * @returns {Promise<string>} - The saved AI-generated image path.
 */
async function generateAIEnhancedImage(description: string, outputPath: string): Promise<string | null> {
    try {
        const response = await openai.images.generate({
            prompt: `Create a new image highlighting the following differences: ${description}`,
            model: "dall-e-3",
            n: 1,
            size: "1024x1024",
        });

        if (response.data.length > 0) {
            const aiImageURL = response.data[0].url;
            console.log(`AI-generated image available at: ${aiImageURL}`);

            // Download and save the AI-generated image locally
            const responseImage = await axios.get(aiImageURL, { responseType: "arraybuffer" });
            fs.writeFileSync(outputPath, responseImage.data);
            console.log(`AI-generated image saved at: ${outputPath}`);
            return outputPath;
        }
    } catch (error) {
        console.error("Error generating AI image:", error);
    }
    return null;
}

/**
 * Jest Test Suite for Image Comparison and AI Enhancement
 */
test.describe("Enhanced Image Comparison Feature", () => {
    const image1 = "tests/images/image1.jpg";
    const image2 = "tests/images/image2.jpg";
    const outputImage = "tests/images/differences.jpg";
    const aiEnhancedImage = "tests/images/ai_differences.jpg";
    const highlightColor = { r: 0, g: 255, b: 0 }; // Green highlight color

    test("Compare images and highlight differences with custom color", async () => {
        const differencesFound = await compareAndHighlightImages(image1, image2, outputImage, highlightColor);
        expect(differencesFound).toBe(true);
    });

    test("Generate AI-enhanced image with detected differences and save locally", async () => {
        const aiImagePath = await generateAIEnhancedImage("Major changes detected between two images.", aiEnhancedImage);
        expect(aiImagePath).toBeDefined();
        console.log("AI-Generated Image saved at:", aiImagePath);
    });
});
