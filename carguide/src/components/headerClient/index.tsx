import logoIcon from "../../assets/img/logo.png";
import HeaderNavbarRight from "../HeaderNavbarRight";
import "./styles.css";

function HeaderClient() {
  return (
    <>
      <header className="carguide-header-client">
        <nav className="carguide-container">
          <div className="container-logo">
            <img
              src={logoIcon}
              alt="carguide"
              style={{ width: "100px", height: "100px" }}
            />
            <h1>Carguide</h1>
          </div>

          <div className="container-navbar-right">
            <HeaderNavbarRight />
          </div>
        </nav>
      </header>
    </>
  );
}

export default HeaderClient;
