import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.css";

function AdminHome() {

  return (
    <div>
      <main>
        <section id="admin-home-section" className="carguide-container">
          <h2 className="carguide-section-title dsc-mb20">
            Área Administrativa
            <FontAwesomeIcon icon={faLock} style={{ fontSize: "24px", marginLeft: "20px" }} />
          </h2>
        </section>
      </main>
    </div>
  );
}

export default AdminHome;
