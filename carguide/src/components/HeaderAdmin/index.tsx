import { faCar, faHome } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-solid-svg-icons/faFile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import logoIcon from "../../assets/img/logo.png";
import LoogedUser from "../LoggedUser";
import "./styles.css";

function HeaderAdmin() {

  return (
    <header className="carguide-header-admin">
      <nav className="carguide-container">
        <div className="container-logo">
          <img
            src={logoIcon}
            alt="carguide"
            style={{ width: "100px", height: "100px" }}
          />
          <h1>Carguide - Administrativo</h1>
        </div>
        <div className="carguide-navbar-right">
          <div className="carguide-menu-items-container">
            <NavLink
              to="/admin/home"
              className={({ isActive }) =>
                isActive ? "carguide-menu-item-active" : ""
              }
            >
              <div className="carguide-menu-item">
                <FontAwesomeIcon icon={faHome} style={{ fontSize: "24px" }} />
                <p>Início</p>
              </div>
            </NavLink>
            <NavLink
              to="/admin/vehicles"
              className={({ isActive }) =>
                isActive ? "carguide-menu-item-active" : ""
              }
            >
              <div className="carguide-menu-item">
              <FontAwesomeIcon icon={faCar} style={{ fontSize: "24px" }} />
                <p>Veículos</p>
              </div>
            </NavLink>
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
          </div>
          <LoogedUser />
        </div>
      </nav>
    </header>
  );
}
export default HeaderAdmin;
