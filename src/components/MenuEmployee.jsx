import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import profileImg from "../assets/imgProfile.png";

import { getUserByToken } from "../services/Auth";
import { getPermissionByUser } from "../services/UserToPermission";

import { logout } from "../services/Auth";

const MenuEmployee = () => {
  const [permissions, setPermissions] = useState([]);
  const [permissionsLoaded, setPermissionsLoaded] = useState(false);

  const username = localStorage.getItem("username");

  const handleLogout = async () => {
    await logout(localStorage.getItem("token"));
    localStorage.clear();
  };

  const getListPermissions = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = await getUserByToken(token);
      const userPermissions = await getPermissionByUser(userId, token);
      setPermissions(userPermissions);
      setPermissionsLoaded(true);
    } catch (error) {
      console.error("Error al obtener los permisos del usuario:", error);
    }
  };

  useEffect(() => {
    getListPermissions();
  }, []);

  return (
    <div className="flex flex-col items-center fixed top-7 left-7 h-max bg-gray-200 text-black rounded-md drop-shadow-lg shadow-lg w-60 max-sm:hidden">
      <div className="pt-4">
        <p className="mb-2 text-center text-2xl">Admin Panel</p>
        {permissionsLoaded && (
          <ul className="p-6">
            {permissions.some(
              (permission) => permission.namePermission === "gestion de eventos"
            ) ? (
              <li className="mb-2 hover:scale-105 transition-transform">
                <Link to="/employee/createevent">
                  <span className="disabled">Crear evento</span>
                </Link>
              </li>
            ) : (
              null
            )}

            {permissions.some(
              (permission) => permission.namePermission === "gestion de eventos"
            ) ? (
              <li className="mb-2 hover:scale-105 transition-transform">
                <Link to="/employee/editevent">
                  <span className="disabled">Editar Evento</span>
                </Link>
              </li>
            ) : (
              null
            )}

            {permissions.some(
              (permission) =>
                permission.namePermission === "asignacion de personal"
            ) ? (
              <li className="mb-2 hover:scale-105 transition-transform">
                <Link to="/employee/assignstaff">
                  <span className="disabled">Asignar personal</span>
                </Link>
              </li>
            ) : (
              null
            )}

            {permissions.some(
              (permission) =>
                permission.namePermission === "asignacion de personal"
            ) ? (
              <li className="mb-2 hover:scale-105 transition-transform">
                <Link to="/employee/assignedevents">
                  <span className="disabled">Eventos asignados</span>
                </Link>
              </li>
            ) : (
              null
            )}

            {permissions.some(
              (permission) =>
                permission.namePermission === "acceso a estadisticas"
            ) ? (
              <li className="py-2 mb-2 hover:scale-105 transition-transform">
                <Link to="/employee/stadistic">
                  <span className="disabled">Estadísticas</span>
                </Link>
              </li>
            ) : (
              null
            )}

            {permissions.some(
              (permission) =>
                permission.namePermission === "gestion de permisos"
            ) ? (
              <li className="mb-2 hover:scale-105 transition-transform">
                <Link to="/employee/employees">
                  <span className="disabled">Empleados</span>
                </Link>
              </li>
            ) : (
              null
            )}

            {permissions.some(
              (permission) =>
                permission.namePermission === "desactivar/activar usuarios"
            ) ? (
              <li className="mb-2 hover:scale-105 transition-transform">
                <Link to="/employee/users">
                  <span className="disabled">Usuarios</span>
                </Link>
              </li>
            ) : (
              null
            )}

            {permissions.some(
              (permission) =>
                permission.namePermission === "desactivar/activar API"
            ) ? (
              <li className="mb-2 hover:scale-105 transition-transform">
                <Link to="/employee/panicbuttom">
                  <span className="disabled">Botón de pánico</span>
                </Link>
              </li>
            ) : (
              null
            )}
          </ul>
        )}
      </div>
      <div className="p-2 hover:scale-105 transition-transform">
        <Link to="/home">
          <a
            href="/"
            className="text-sm  font-montserrat"
          >
            Regresar a inicio
          </a>
        </Link>
      </div>
      <div className="p-4 hover:scale-105 transition-transform">
        <Link to="/">
          <a
            href="/"
            className="text-md  underline font-montserrat"
            onClick={handleLogout}
          >
            Cerrar sesión
          </a>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default MenuEmployee;
