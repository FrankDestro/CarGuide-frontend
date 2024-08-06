import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/Private";
import { AccessTokenPayLoadDTO } from "./models/auth";
import Admin from "./pages/Admin";
import AdminHome from "./pages/Admin/AdminHome";
import VehicleForm from "./pages/Admin/VehicleForm";
import VehicleListing from "./pages/Admin/VehicleListing";
import Catalog from "./pages/client/Catalog";
import ClientHome from "./pages/client/home";
import Login from "./pages/client/Login";
import * as authService from "./services/auth-service";
import { ContextToken } from "./utils/context-token";
import { history } from "./utils/history";
import {
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";

function App() {

  const [contextTokenPayload, setContextTokenPayload] = useState<AccessTokenPayLoadDTO>();

  useEffect(() => {

    if (authService.isAuthenticated()) {
      const payload = authService.getAccessTokenPayload();
      setContextTokenPayload(payload);
    }
  }, []);

  return (
     <ContextToken.Provider value={{ contextTokenPayload, setContextTokenPayload }}>
     <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<ClientHome />}>
          <Route index element={<Catalog />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/admin/" element={<PrivateRoute roles={["ROLE_ADMIN"]}> <Admin /></PrivateRoute>}>
          <Route index element={<Navigate to="/admin/home" />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="vehicles" element={<VehicleListing />} />
          <Route path="vehicle/:vehicleId" element={<VehicleForm />} />
        </Route>
      </Routes>
    </HistoryRouter>
    </ContextToken.Provider>
  );
}

export default App;
