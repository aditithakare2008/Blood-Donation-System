import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const donorData = localStorage.getItem("donor");

  const donor = donorData ? JSON.parse(donorData) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("donor");

    navigate("/login");

    // Refresh navbar after logout
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          🩸 Blood Donation
        </Link>

        <div className="navbar-nav ms-auto">

          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/search">
            Search
          </Link>

          {!token && (
            <Link className="nav-link" to="/register">
              Register
            </Link>
          )}

          {!token && (
            <Link className="nav-link" to="/login">
              Login
            </Link>
          )}

          <Link className="nav-link" to="/emergency">
            Emergency
          </Link>

          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>

          <Link className="nav-link" to="/contact">
            Contact
          </Link>

          {token && donor && (
            <>
              <Link className="nav-link" to="/profile">
                Profile
              </Link>

              <span className="nav-link fw-bold">
                👤 {donor.name}
              </span>

              <button
                className="btn btn-light btn-sm ms-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;