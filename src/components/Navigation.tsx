import { Link } from 'react-router-dom';
export default function Navigation() {
  return (
    <nav className="nav-links">
      <Link to="/about" className="nav-link">about me</Link>
      <br />
      <Link to="/places" className="nav-link">places</Link>
    </nav>
  );
}
