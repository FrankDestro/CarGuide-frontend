import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link } from "react-router-dom";
import * as authService from "../../services/auth-service";
import { ContextToken } from "../../utils/context-token";

export default function LoogedUser() {
  const { contextTokenPayload, setContextTokenPayload } =
    useContext(ContextToken);

  function handleLogoutClick() {
    authService.Logout();
    setContextTokenPayload(undefined);
  }

  return contextTokenPayload && authService.isAuthenticated() ? (
    <div className="carguide-logged-user">
      <p>{contextTokenPayload.username}</p>
      <div>
        <FontAwesomeIcon
          icon={faSignOut}
          style={{ marginRight: "10px" }}
          onClick={handleLogoutClick}
        />
        <span onClick={handleLogoutClick}>Sair</span>
      </div>
    </div>
  ) : (
    <Link to="/login">Entrar</Link>
  );
}
