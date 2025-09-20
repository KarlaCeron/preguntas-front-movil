import { View, Text, StyleSheet } from "react-native";

export default function PlayerList({ jugadores }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👥 Jugadores en Lobby</Text>
      {jugadores.map((j) => (
        <Text key={j.id} style={styles.player}>
          {j.nombre}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 20, width: "100%", alignItems: "center" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  player: { fontSize: 16, padding: 5 },
});
