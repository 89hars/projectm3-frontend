import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import { CartContext } from "../contexts/CartContext";

function Header() {
  const { cart } = useContext(CartContext);
  const { isLoggedIn, user, logout } = useContext(SessionContext);

  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary py-4 border-bottom bg-white">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <NavLink to="/" className="navbar-brand fw-bold me-4">
            Finest deal
          </NavLink>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link me-4">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/allproducts" className="nav-link">
                Products
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/cart"
                    className="nav-link me-4 position-relative"
                  >
                    <i className="bi-cart"></i> Cart
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                      {cart?.length}
                    </span>
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle me-3"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Hello {user?.firstName}
                  </NavLink>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <NavLink className="dropdown-item" to="/profile">
                        Profile
                      </NavLink>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <a className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
                <div className="d-flex">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => {
                      navigate("/create");
                    }}
                  >
                    Create Artwork
                  </button>
                </div>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link me-4">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/signup" className="btn btn-primary">
                    Signup
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
