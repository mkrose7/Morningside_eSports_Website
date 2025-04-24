import { useEffect, useState } from 'react';
import { getSheetData } from '../api/getSheetData';
import '../styles/Teams.css';

const SEMESTERS = [
  "Spring2025", "Fall2024", "Spring2024", "Fall2023",
  "Spring2023", "Fall2022", "Spring2022", "Fall2021", "2017-2021"
];

export default function Teams() {
  const [players, setPlayers] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("Spring2025");
  const [coaches, setCoaches] = useState([]);


  useEffect(() => {
    getSheetData(selectedSemester).then(data => {
      setPlayers(data.players);
      setCoaches(data.coaches);
    });
  }, [selectedSemester]);


  const getAllGames = () => {
    const gameSet = new Set();
    players.forEach(p => {
      if (p.teamPrimary && (p.teamPriority === "V" || p.teamPriority === "JV")) {
        gameSet.add(p.teamPrimary.trim());
      }
    });
    return Array.from(gameSet);
  };

  const renderPlayers = (team, priority) =>
    players
      .filter(p => p.teamPrimary === team && p.teamPriority === priority)
      .map((p, i) => (
        <li key={i} className="player-item">
          <span><strong>{p.playerIGN} {p.playerTag}</strong></span>
          <span>{p.playerFirstName} {p.playerLastName}</span>
          <span>{p.year}</span>
          <span>{p.position}</span>
          <span>{p.rolePrimary}{p.roleSecondary ? ` / ${p.roleSecondary}` : ''}</span>
        </li>
      ));

  const renderSemesterCoaches = () =>
    coaches.map((c, i) => (
      <li key={i} className="player-item">
        <span><strong>{c.coachFirstName} {c.coachLastName}</strong></span>
        <span className="player-role">{c.role || "Coach"}</span>
        <span>{c.team}</span>
      </li>
    ));

  const hasVarsity = (team) =>
    players.some(p => p.teamPrimary === team && p.teamPriority === "V");

  const hasJV = (team) =>
    players.some(p => p.teamPrimary === team && p.teamPriority === "JV");

  return (
    <div className="content">
      <div className="semester-select">
        <label htmlFor="semester">Select Semester: </label>
        <select
          id="semester"
          value={selectedSemester}
          onChange={e => setSelectedSemester(e.target.value)}
        >
          {SEMESTERS.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {getAllGames().map(game => (
        <div className="team-section" key={game} id={game.toLowerCase().replace(/\s/g, '-')}>
          <h2>{game}</h2>
          <div className="team-grid">
            {hasVarsity(game) && (
              <div className="team-card">
                <h3>Varsity Team</h3>
                <ul className="player-list">{renderPlayers(game, "V")}</ul>
              </div>
            )}
            {hasJV(game) && (
              <div className="team-card">
                <h3>JV Team</h3>
                <ul className="player-list">{renderPlayers(game, "JV")}</ul>
              </div>
            )}
          </div>
        </div>
      ))}

      {renderSemesterCoaches().length > 0 && (
        <div className="team-section">
          <h2>Coaches</h2>
          <div className="team-card">
            <ul className="player-list">{renderSemesterCoaches()}</ul>
          </div>
        </div>
      )}
    </div>
  );
}
