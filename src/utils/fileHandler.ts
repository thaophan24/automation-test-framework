// src/core/utils/fileHandler.ts
import fs from 'fs';

export const readJSONFile = (filePath: string): any => {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

export const writeToFile = (filePath: string, data: string): void => {
    fs.writeFileSync(filePath, data, 'utf8');
};

// src/core/utils/logger.ts
export const logInfo = (message: string): void => console.log(`[INFO]: ${message}`);
export const logError = (message: string): void => console.error(`[ERROR]: ${message}`);
