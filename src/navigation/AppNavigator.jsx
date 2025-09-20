import { Routes, Route } from "react-router-dom";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import NicknameScreen from "../screens/NicknameScreen";
import LobbyScreen from "../screens/LobbyScreen";
import GameScreen from "../screens/GameScreen";
import ResultadosScreen from "../screens/ResultadosScreen";

export default function AppNavigator() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/nickname" element={<NicknameScreen />} />
      <Route path="/lobby" element={<LobbyScreen />} />
      <Route path="/game" element={<GameScreen />} />
      <Route path="/resultados" element={<ResultadosScreen />} />
    </Routes>
  );
}
