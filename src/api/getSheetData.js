const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SPREADSHEET_ID = import.meta.env.VITE_SHEET_ID;

export const getSheetData = async (sheetName) => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${sheetName}?key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.values || data.error) {
        console.error("Error loading sheet:", data.error || "No data");
        return { players: [], coaches: [] };
    }

    const headers = data.values[0];
    const playerRows = [];
    const coachRows = [];

    for (let i = 1; i < data.values.length; i++) {
        const row = data.values[i];

        // Columns A–M = 0 to 12 (players), N–Q = 13 to 16 (coaches)
        const playerPart = row.slice(0, 13);
        const coachPart = row.slice(13, 17);

        const playerObj = headers.slice(0, 13).reduce((obj, key, idx) => {
            obj[key] = playerPart[idx] || "";
            return obj;
        }, {});

        const coachObj = headers.slice(13, 17).reduce((obj, key, idx) => {
            obj[key] = coachPart[idx] || "";
            return obj;
        }, {});

        const hasPlayerData = Object.values(playerObj).some(v => v);
        const hasCoachData = Object.values(coachObj).some(v => v);

        if (hasPlayerData) playerRows.push(playerObj);
        if (hasCoachData) coachRows.push(coachObj);
    }

    return {
        players: playerRows,
        coaches: coachRows
    };
};
