import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import RutaProtegido from "./layout/RutaProtegido";

import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import Login from "./pages/Login";
import NuevoPassword from "./pages/NuevoPassword";
import RecuperarPassword from "./pages/RecuperarPassword";
import Registrar from "./pages/Registrar";
import AdministrarPacientes from "./pages/AdministrarPacientes";
import EditarPerfil from "./pages/EditarPerfil";
import CambiarPassword from "./pages/CambiarPassword";

import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacienteProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="recuperar" element={<RecuperarPassword />} />
              <Route path="recuperar/:token" element={<NuevoPassword />} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>

            <Route path="/admin" element={<RutaProtegido />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path="perfil" element={<EditarPerfil />} />
              <Route path="cambiar-password" element={<CambiarPassword />} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
