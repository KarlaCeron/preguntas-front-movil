import { useEffect, useState } from "react";
import { socket } from "../sockets/socket";
import { useNavigate } from "react-router-dom";

export default function LobbyScreen() {
  const [jugadores, setJugadores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const nickname = localStorage.getItem("nickname");

    if (!nickname) {
      navigate("/nickname"); // si alguien entra directo sin apodo
      return;
    }

    // Registrarse en el lobby
    socket.emit("registrarJugador", nickname);

    // Escuchar lista de jugadores
    socket.on("jugadoresActualizados", (data) => {
      console.log("👥 Jugadores actualizados:", data);
      setJugadores(data);
    });

    // Escuchar cuando se inicia el juego
    socket.on("iniciarJuego", () => {
      console.log("🚀 El juego comienza!");
      navigate("/game");
    });

    return () => {
      socket.off("jugadoresActualizados");
      socket.off("iniciarJuego");
    };
  }, [navigate]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎮 Lobby</h1>

      <h2 className="mb-2 font-semibold">Jugadores conectados:</h2>
      <ul className="list-disc pl-6">
        {jugadores.length > 0 ? (
          jugadores.map((j) => (
            <li key={j.id} className="mb-1">
              {j.nombre}
            </li>
          ))
        ) : (
          <p className="text-gray-500">Esperando jugadores...</p>
        )}
      </ul>

      <div className="mt-6">
        <p className="text-sm text-gray-600">
          Espera a que el admin inicie la partida 🚀
        </p>
      </div>
    </div>
  );
}
