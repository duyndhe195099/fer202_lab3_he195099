import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="card hero">
      <h1>Welcome to ProductStore</h1>
      <p>Manage and explore products for your needs.</p>
      <Link to="/products" className="btn">View Products</Link>
    </div>
  );
}

export default Home;
