import React, { useState } from "react";
import profile from "../assets/perfil.png";

import { toggleUserByEmail } from "../services/User";

const UserCard = ({ email, state }) => {
  const [accountSuspended, setAccountSuspended] = useState(true);
  const token = localStorage.getItem("token");

  const handleToggle = async () => {
    try {
      // Llamar al servicio para suspender/activar la cuenta
      await toggleUserByEmail(email, token);

      // Actualizar el estado del botón
      setAccountSuspended(!accountSuspended);
    } catch (error) {
      console.error("Error al suspender/activar la cuenta:", error);
    }
  };

  return (
    <div className="w-11/12 h-12 bg-gray-200 flex items-center justify-between pl-2 rounded-md shadow-lg drop-shadow-lg">
      <div className="flex items-center">
        <img
          src={profile}
          alt="Imagen de perfil"
          className="w-6 h-6 rounded-full mr-2"
        />
        <p className="font-montserrat font-semibold text-xs flex-grow-2 pr-2">
          {email}
        </p>
      </div>
      <button
        className={`text-white text-xs h-full p-3 ${
          accountSuspended && state ? "bg-red-700" : "bg-green-500"
        }`}
        onClick={handleToggle}
      >
        {accountSuspended && state ? "Suspender cuenta" : "Activar cuenta"}
      </button>
    </div>
  );
};

export default UserCard;
