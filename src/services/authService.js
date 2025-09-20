import API from "./api";

// 🔹 Registro de jugador
export const register = async (email, password) => {
  try {
    const res = await API.post("/auth/register", { email, password });
    return res.data; // { token, user }
  } catch (err) {
    throw err.response?.data || { message: "Error en el registro" };
  }
};

// 🔹 Login de jugador/admin
export const login = async (email, password) => {
  try {
    const res = await API.post("/auth/login", { email, password });
    return res.data; // { token, user }
  } catch (err) {
    throw err.response?.data || { message: "Error en el login" };
  }
};

// 🔹 Obtener perfil del usuario (requiere token)
export const getProfile = async (token) => {
  try {
    const res = await API.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data; // { id, email, rol, estadisticas }
  } catch (err) {
    throw err.response?.data || { message: "Error al obtener perfil" };
  }
};
