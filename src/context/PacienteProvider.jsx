import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";

const PacientesContext = createContext();

const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios("/pacientes", config);
        setPacientes(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPacientes();
  }, []);

  const guardarPaciente = async (paciente) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (paciente.id) {
      console.log("Editando");
      try {
        const { data } = await clienteAxios.put(
          `/pacientes/${paciente.id}`,
          paciente,
          config
        );
        const pacientesActualizado = pacientes.map((pacienteState) =>
          pacienteState._id === data._id ? data : pacienteState
        );
        setPacientes(pacientesActualizado);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        console.log("Creando");
        const { data } = await clienteAxios.post(
          "/pacientes",
          paciente,
          config
        );

        const { createdAt, updateAt, __V, ...pacienteAlmacenado } = data;

        setPacientes([pacienteAlmacenado, ...pacientes]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setEdicion = (paciente) => {
    setPaciente(paciente);
  };

  const eliminarPaciente = async (id) => {
    const confirmar = confirm("Deseas Eliminar");
    if (confirmar) {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios.delete(`/pacientes/${id}`, config);

        const pacienteActualizado = pacientes.filter(
          (pacienteState) => pacienteState._id !== id
        );
        setPacientes(pacienteActualizado);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <PacientesContext.Provider
      value={{
        pacientes,
        guardarPaciente,
        setEdicion,
        paciente,
        eliminarPaciente,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export { PacientesProvider };

export default PacientesContext;
