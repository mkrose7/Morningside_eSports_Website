import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <div className="header-content">
        <h1><Link to="/">Morningside eSports</Link></h1>
        <nav>
          <Link to="/teams">TEAMS</Link>
          <Link to="/match-history">MATCH HISTORY</Link>
          <Link to="/origins">ORIGINS</Link>
        </nav>
      </div>
    </header>
  );
}
