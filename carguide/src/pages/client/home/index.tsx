import { Outlet } from "react-router-dom";
import HeaderClient from "../../../components/headerClient";
import HeaderNavbarRight from "../../../components/HeaderNavbarRight";
import "./styles.css";

function ClientHome() {
  return (
    <div>
      <HeaderClient />
      <Outlet />
      <div className="navbar-right-mobile">
        <HeaderNavbarRight />
      </div>
    </div>
  );
}

export default ClientHome;