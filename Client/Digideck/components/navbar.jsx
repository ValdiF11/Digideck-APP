import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    localStorage.removeItem("acces_token");
    navigate("/login");
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html");
    if (isDarkMode) {
      html.setAttribute("data-bs-theme", "dark");
    } else {
      html.setAttribute("data-bs-theme", "light");
    }

    return () => {
      html.removeAttribute("data-bs-theme");
    };
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleLogin = (e) => {
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="px-2">
            <img src="logo.png" alt="" style={{ width: "40px" }} />
          </div>
          <Link className="navbar-brand" to={"/"}>
            Digi Deck
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse px-3" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={"/"}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={"/deck"}>
                  Deck
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={"/chat"}>
                  Chat AI
                </Link>
              </li>
            </ul>
            <div className={`${isDarkMode ? "bg-dark text-white" : ""}`} style={{ paddingRight: "20px" }}>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="darkModeToggle" checked={isDarkMode} onChange={toggleDarkMode} />
                <label className="form-check-label" htmlFor="darkModeToggle">
                  Dark Mode
                </label>
              </div>
            </div>
            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {localStorage.acces_token ? (
                  <button onClick={handleLogout} className="nav-link" id="nav-logout">
                    Logout
                  </button>
                ) : (
                  <button onClick={handleLogin} className="nav-link" id="nav-logout">
                    Login
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
