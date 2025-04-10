// src/pages/Teams.jsx
import '../styles/Teams.css';
//import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Teams() {
  return (
    <div className="content">
      <div className="team-section">
        <h2>Head Coach</h2>
        <div className="team-card">
          <h3>Head Coach</h3>
          <ul className="player-list">
            <li className="player-item">
              <span>Coach Name</span>
              <span className="player-role">Head Coach</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="team-section" id="overwatch">
        <h2>Overwatch</h2>
        <div className="team-grid">
          <div className="team-card">
            <h3>Varsity Team</h3>
            <ul className="player-list">
              <li className="player-item"><span>Coach Name</span><span className="player-role">Coach</span></li>
              <li className="player-item"><span>Player Name 1</span><span className="player-role">DPS</span></li>
              <li className="player-item"><span>Player Name 2</span><span className="player-role">Tank</span></li>
              <li className="player-item"><span>Player Name 3</span><span className="player-role">Support</span></li>
              <li className="player-item"><span>Player Name 4</span><span className="player-role">DPS</span></li>
              <li className="player-item"><span>Player Name 5</span><span className="player-role">Support</span></li>
            </ul>
          </div>

          <div className="team-card">
            <h3>JV Team</h3>
            <ul className="player-list">
              <li className="player-item"><span>Player Name 1</span><span className="player-role">DPS</span></li>
              <li className="player-item"><span>Player Name 2</span><span className="player-role">Tank</span></li>
              <li className="player-item"><span>Player Name 3</span><span className="player-role">Support</span></li>
              <li className="player-item"><span>Player Name 4</span><span className="player-role">DPS</span></li>
              <li className="player-item"><span>Player Name 5</span><span className="player-role">Support</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="team-section" id="valorant">
        <h2>Valorant</h2>
        <div className="team-grid">
          <div className="team-card">
            <h3>Varsity Team</h3>
            <ul className="player-list">
              <li className="player-item"><span>Coach Name</span><span className="player-role">Coach</span></li>
              <li className="player-item"><span>Player Name 1</span><span className="player-role">Duelist</span></li>
              <li className="player-item"><span>Player Name 2</span><span className="player-role">Controller</span></li>
              <li className="player-item"><span>Player Name 3</span><span className="player-role">Sentinel</span></li>
              <li className="player-item"><span>Player Name 4</span><span className="player-role">Initiator</span></li>
              <li className="player-item"><span>Player Name 5</span><span className="player-role">Flex</span></li>
            </ul>
          </div>

          <div className="team-card">
            <h3>JV Team</h3>
            <ul className="player-list">
              <li className="player-item"><span>Player Name 1</span><span className="player-role">Duelist</span></li>
              <li className="player-item"><span>Player Name 2</span><span className="player-role">Controller</span></li>
              <li className="player-item"><span>Player Name 3</span><span className="player-role">Sentinel</span></li>
              <li className="player-item"><span>Player Name 4</span><span className="player-role">Initiator</span></li>
              <li className="player-item"><span>Player Name 5</span><span className="player-role">Flex</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="team-section" id="rocket-league">
        <h2>Rocket League</h2>
        <div className="team-grid">
          <div className="team-card">
            <h3>Varsity Team</h3>
            <ul className="player-list">
              <li className="player-item"><span>Coach Name</span><span className="player-role">Coach</span></li>
              <li className="player-item"><span>Player Name 1</span><span className="player-role">Striker</span></li>
              <li className="player-item"><span>Player Name 2</span><span className="player-role">Midfielder</span></li>
              <li className="player-item"><span>Player Name 3</span><span className="player-role">Defender</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="team-section" id="past-teams">
        <h2>Past Teams</h2>
        <h4>League of Legends</h4>
        <h5>
          {/* Team Member List */}
        </h5>
      </div>
    </div>
  );
}
