import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResultadosScreen() {
  const [resultados, setResultados] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("resultados");
    if (data) {
      setResultados(JSON.parse(data));
    }
  }, []);

  if (!resultados) return <p className="p-6">⏳ Cargando resultados...</p>;

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">🏆 Resultados</h1>

      {/* 📋 Ranking */}
      <ul className="w-full max-w-md">
        {resultados.jugadores
          .sort((a, b) => b.puntos - a.puntos) // ordenar por puntos
          .map((j, i) => (
            <li
              key={i}
              className={`border p-3 mb-2 rounded flex justify-between items-center ${
                i === 0 ? "bg-yellow-200 font-bold" : "bg-gray-100"
              }`}
            >
              <span>
                {i + 1}. {j.nombre}
              </span>
              <span>{j.puntos} pts</span>
            </li>
          ))}
      </ul>

      {/* 🥇 Ganador */}
      <h2 className="text-2xl mt-6">
        🥇 Ganador:{" "}
        <span className="font-bold text-green-600">{resultados.ganador}</span>
      </h2>

      {/* 🔄 Reinicio */}
      <button
        onClick={() => navigate("/")}
        className="mt-8 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
      >
        Volver al inicio
      </button>
    </div>
  );
}
