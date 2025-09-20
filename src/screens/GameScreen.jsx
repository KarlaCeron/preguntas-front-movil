import { useEffect, useState } from "react";
import { socket } from "../sockets/socket";
import { useNavigate } from "react-router-dom";

export default function GameScreen() {
  const [pregunta, setPregunta] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [bloqueado, setBloqueado] = useState(false); // ⛔️ evitar múltiples respuestas
  const navigate = useNavigate();

  useEffect(() => {
    // 📚 Escuchar nueva pregunta
    socket.on("nuevaPregunta", (data) => {
      console.log("📩 Pregunta recibida:", data);
      setPregunta(data);
      setMensaje("");
      setBloqueado(false); // desbloquear botones
    });

    // 🏁 Escuchar cuando termina el juego
    socket.on("finJuego", (data) => {
      console.log("🏆 Resultados:", data);
      localStorage.setItem("resultados", JSON.stringify(data));
      navigate("/resultados");
    });

    return () => {
      socket.off("nuevaPregunta");
      socket.off("finJuego");
    };
  }, [navigate]);

  const responder = (opcion) => {
    if (bloqueado) return; // no dejar enviar más de 1
    const nickname = localStorage.getItem("nickname");
    socket.emit("responder", { jugador: nickname, respuesta: opcion });
    setMensaje("✅ Respuesta enviada, esperando...");
    setBloqueado(true); // bloquear botones después de responder
  };

  if (!pregunta) return <p className="p-6">⏳ Esperando pregunta...</p>;

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">❓ Pregunta</h1>
      <p className="mb-6 text-lg">{pregunta.texto}</p>

      <div className="flex flex-col gap-3 w-full max-w-md">
        {pregunta.opciones.map((op, i) => (
          <button
            key={i}
            onClick={() => responder(op)}
            disabled={bloqueado}
            className={`px-4 py-2 rounded ${
              bloqueado
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {op}
          </button>
        ))}
      </div>

      {mensaje && <p className="mt-6 text-green-600 font-medium">{mensaje}</p>}
    </div>
  );
}
