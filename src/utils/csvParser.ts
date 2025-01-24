import fs from 'fs';
import csvParser from 'csv-parser';

export const parseCSV = (filePath: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const rows: any[] = [];
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => rows.push(row))
            .on('end', () => resolve(rows))
            .on('error', (error) => reject(error));
    });
};

