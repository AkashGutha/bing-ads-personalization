import * as fs from 'fs';

export function loadTSV(filePath: string): string[][] {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const lines = data.split('\n');
    
    // Initialize an empty array to store the parsed TSV data
    const tsvData: string[][] = [];

    for (const line of lines) {
      // Split each line by the tab character to separate columns
      const columns = line.split('\t');
      tsvData.push(columns);
    }

    return tsvData;
  } catch (error) {
    console.error('Error reading TSV file:', error);
    return [];
  }
}


export function tsvToJsonString(tsvFilePath: string): string {
    try {
      const tsvData = fs.readFileSync(tsvFilePath, 'utf-8');
      const rows = tsvData.split('\n');
      
      // Initialize an array to store the JSON objects
      const jsonData: any[] = [];
  
      // Assuming the first row contains the column headers
      const headers =rows[0].trim().split('\t');
  
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i].trim().split('\t');
        const rowData: any = {};
  
        for (let j = 0; j < headers.length; j++) {
          rowData[headers[j]] = row[j];
        }
  
        jsonData.push(rowData);
      }
  
      // Convert the JSON data to a JSON string
      const jsonString = JSON.stringify(jsonData, null, 2);
      return jsonString;
    } catch (error) {
      console.error('Error converting TSV to JSON:', error);
      return '';
    }
  }
