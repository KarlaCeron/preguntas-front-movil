import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const user = await register(email, password);
      console.log("✅ Registrado:", user);

      // 🔄 Después de registrarse, lo mandamos al login
      navigate("/", { replace: true });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-xl mb-4">📝 Registro</h1>
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
        onClick={handleRegister}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Registrarse
      </button>
      <p
        onClick={() => navigate("/")}
        className="mt-3 text-blue-600 cursor-pointer"
      >
        ¿Ya tienes cuenta? Inicia sesión
      </p>
    </div>
  );
}
