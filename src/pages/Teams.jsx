// src/pages/Teams.jsx
import { useEffect, useState } from 'react';
import { getSheetData } from '../api/getSheetData';
import { getSemesters } from '../api/semesters';

import '../styles/Teams.css';

const SECTION_COLORS = [
  "#f2f2f2", "#e5e5e5", "#ffffff", "#f9f9f9",
];

export default function Teams() {
  const [players, setPlayers] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState('');

  useEffect(() => {
    async function fetchSemesters() {
      const data = await getSemesters();
      setSemesters(data);
      setSelectedSemester(data[0]);
    }

    fetchSemesters();
  }, []);

  useEffect(() => {
    if (selectedSemester) {
      getSheetData(selectedSemester).then(data => {
        setPlayers(data.players);
        setCoaches(data.coaches);
        window.scrollTo(0, 0); // Optional: scroll to top when semester changes
      });
    }
  }, [selectedSemester]);

  const getAllGames = () => {
    const gameSet = new Set();
    players.forEach(p => {
      if (p.teamPrimary && p.teamPrimary.trim() !== "") {
        gameSet.add(p.teamPrimary.trim());
      } else {
        gameSet.add("Unknown Team");
      }
    });
    return Array.from(gameSet);
  };


  const renderPlayers = (team) => {
    const filteredPlayers = players.filter(p => {
      if (p.teamPrimary) {
        return p.teamPrimary.trim() === team.trim();
      } else {
        // If no teamPrimary exists, show all players
        return true;
      }
    });

    if (filteredPlayers.length === 0) {
      return <div>No players available.</div>;
    }

    return (
      <div className="players-grid-wrapper">
        <div className="players-grid">
          {filteredPlayers.map((p, i) => (
            <div key={i} className="player-card">
              <strong>{p.playerFirstName} {p.playerLastName}</strong>
              {p.year && <span>{p.year}</span>}
            </div>
          ))}
        </div>
      </div>
    );
  };


  const renderSemesterCoaches = () =>
    coaches.map((c, i) => (
      <div key={i} className="player-card">
        <strong>{c.coachFirstName} {c.coachLastName}</strong>
        <span>{c.role || "Coach"}</span>
        <span>{c.team}</span>
      </div>
    ));

  const allGames = getAllGames();

  return (
    <div className="teams-wrapper">
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

      {/* New Section: Team Links */}
      <div className="team-links">
        {allGames.map((game) => (
          <a key={game} href={`#${game.replace(/\s+/g, '-')}`} className="team-link">
            {game}
          </a>
        ))}
      </div>

      {/* Teams Section */}
      {allGames.map((game, index) => (
        <div
          className="team-section"
          key={game}
          id={game.replace(/\s+/g, '-')}
          style={{ backgroundColor: SECTION_COLORS[index % SECTION_COLORS.length] }}
        >
          <h2>{game}</h2>
          <div className="teams-grid">
            <div className="team-card">
              {renderPlayers(game)}
            </div>
          </div>
        </div>
      ))}

      {/* Coaches Section */}
      {renderSemesterCoaches().length > 0 && (
        <div className="team-section" style={{ backgroundColor: "#f2f2f2" }}>
          <h2>Coaches</h2>
          <div className="teams-grid">
            <div className="team-card">
              <div className="players-grid-wrapper">
                <div className="players-grid">{renderSemesterCoaches()}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
