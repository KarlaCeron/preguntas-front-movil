import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      console.log("✅ Logueado:", data);
      localStorage.setItem("token", data.token); // guardar token
      // 🔄 Redirige al nickname
      navigate("/nickname", { replace: true });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-xl mb-4">🔑 Login</h1>
      <input
        className="border p-2 mb-2 w-full"
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-full"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Ingresar
      </button>
      <p
        onClick={() => navigate("/register")}
        className="mt-3 text-blue-600 cursor-pointer"
      >
        ¿No tienes cuenta? Regístrate
      </p>
    </div>
  );
}
