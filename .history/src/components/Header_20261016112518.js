import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">ProductStore</Link>
      <nav>
      
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/products">Products</NavLink>
      </nav>
    </header>
  );
}

export default Header;
