// src/pages/MatchHistory.jsx
import { useEffect, useState } from 'react';
import { getMatchHistoryData } from '../api/getMatchHistoryData';
import { getMatchHistorySemesters } from '../api/getMatchHistorySemesters';
import '../styles/Matchhistory.css';

const SECTION_COLORS = [
  "#f2f2f2", "#e5e5e5", "#ffffff", "#f9f9f9",
];

export default function MatchHistory() {
  const [matches, setMatches] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState('');

  useEffect(() => {
    async function fetchSemesters() {
      const data = await getMatchHistorySemesters();
      setSemesters(data);
      setSelectedSemester(data[0]);
    }
    fetchSemesters();
  }, []);

  useEffect(() => {
    if (selectedSemester) {
      getMatchHistoryData(selectedSemester).then(data => {
        setMatches(data.matches);
        window.scrollTo(0, 0);
      });
    }
  }, [selectedSemester]);

  const getAllTeams = () => {
    const teamSet = new Set();
    matches.forEach(match => {
      if (match.team) {
        teamSet.add(match.team.trim());
      }
    });
    return Array.from(teamSet);
  };

  const allTeams = getAllTeams();

  return (
    <div className="match-history-wrapper">
      <div className="semester-select">
        <label htmlFor="semester">Select Semester: </label>
        <select
          id="semester"
          value={selectedSemester}
          onChange={e => setSelectedSemester(e.target.value)}
        >
          {semesters.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Team Links */}
      <div className="team-links">
        {allTeams.map((team) => (
          <a key={team} href={`#${team.replace(/\s+/g, '-')}`} className="team-link">
            {team}
          </a>
        ))}
      </div>

      {/* Match Sections */}
      {allTeams.map((team, index) => (
        <div
          className="team-section"
          key={team}
          id={team.replace(/\s+/g, '-')}
          style={{ backgroundColor: SECTION_COLORS[index % SECTION_COLORS.length] }}
        >
          <h2>{team}</h2>
          <div className="matches-grid">
            {matches
              .filter(m => (
                m.team === team &&
                m.rivalUni &&                      // rivalUni must exist
                m.rivalUni.toUpperCase() !== 'NO MATCH' // rivalUni must not say NO MATCH
              ))
              .map((match, idx) => (
                <div key={idx} className="match-card">
                  <strong>{match.matchDate} — {match.rivalUni}</strong>
                  <span>Result: {match.matchResult}</span>
                  {match.seasonType && <span>Season: {match.seasonType}</span>}
                  {match.finalsETC && <span>Finals: {match.finalsETC}</span>}
                  {match.reschedule && <span>Reschedule: {match.reschedule}</span>}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
