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

        const rowObj = headers.reduce((obj, key, idx) => {
            obj[key] = row[idx] || "";
            return obj;
        }, {});

        // Normalize field names
        if (!rowObj.teamPrimary) {
            if (rowObj.team) rowObj.teamPrimary = rowObj.team;
            if (rowObj.gamePlayed) rowObj.teamPrimary = rowObj.gamePlayed;
        }

        const hasPlayerInfo = rowObj.playerFirstName || rowObj.playerLastName || rowObj.teamPrimary;
        const hasCoachInfo = rowObj.coachFirstName || rowObj.coachLastName;

        if (hasPlayerInfo) {
            playerRows.push(rowObj);
        }
        if (hasCoachInfo) {
            coachRows.push(rowObj);
        }
    }

    return {
        players: playerRows,
        coaches: coachRows,
    };
};
