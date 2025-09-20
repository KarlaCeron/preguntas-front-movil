import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NicknameScreen() {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleNickname = () => {
    if (!nickname.trim()) {
      alert("⚠️ Por favor, ingresa un apodo válido");
      return;
    }
    localStorage.setItem("nickname", nickname.trim());
    navigate("/lobby");
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-xl mb-4">👤 Ingresa tu apodo</h1>
      <input
        className="border p-2 mb-2 w-full"
        type="text"
        placeholder="Tu apodo"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <button
        onClick={handleNickname}
        className="bg-purple-500 text-white px-4 py-2 rounded w-full"
      >
        Ingresar
      </button>
    </div>
  );
}
