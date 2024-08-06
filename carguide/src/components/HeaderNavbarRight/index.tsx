import { faFile, faFileArchive } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
import "./styles.css";

function HeaderNavbarRight() {
  return (
    <nav>
      <div className="carguide-navbar-right">
        <Link to="/admin">
          <div className="container-right-menu-admin">
            <FontAwesomeIcon
              icon={faFileArchive}
              style={{ fontSize: "24px" }}
            />
            <span>Admin</span>
          </div>
        </Link>
        <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "carguide-menu-item-active" : ""
              }
            >
              <div className="carguide-menu-item">
              <FontAwesomeIcon icon={faFile} style={{ fontSize: "24px" }} />
                <p>Catálogo</p>
              </div>
            </NavLink>
        <div></div>
      </div>
    </nav>
  );
}

export default HeaderNavbarRight;
