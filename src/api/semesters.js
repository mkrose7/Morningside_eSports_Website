const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SPREADSHEET_ID = import.meta.env.VITE_SHEET_ID;

export const getSemesters = async () => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}?key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.sheets || data.error) {
        console.error("Error loading sheet list:", data.error || "No data");
        return [];
    }

    const sheetNames = data.sheets.map(sheet => sheet.properties.title);
    return sheetNames;
};
