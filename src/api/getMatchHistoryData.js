const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SPREADSHEET_ID = import.meta.env.VITE_MATCH_HISTORY_SHEET_ID;

export const getMatchHistoryData = async (sheetName) => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${sheetName}?key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.values || data.error) {
        console.error("Error loading match history:", data.error || "No data");
        return { matches: [] };
    }

    const headers = data.values[0];
    const matchRows = [];

    for (let i = 1; i < data.values.length; i++) {
        const row = data.values[i];

        const matchObj = headers.reduce((obj, key, idx) => {
            obj[key] = row[idx] || "";
            return obj;
        }, {});

        matchRows.push(matchObj);
    }

    return { matches: matchRows };
};
