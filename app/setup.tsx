import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SetupScreen() {
  const router = useRouter();
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [sets, setSets] = useState<3 | 5>(3);
  const [gamesPerSet, setGamesPerSet] = useState<1 | 3 | 5>(3);

  const canStart = team1.trim().length > 0 && team2.trim().length > 0;

  const startMatch = () => {
    router.push({
      pathname: '/score',
      params: { team1: team1.trim(), team2: team2.trim(), sets, gamesPerSet },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Match Setup</Text>
      <Text style={styles.subtitle}>Enter team or player names</Text>

      <Text style={styles.label}>Team / Player 1</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Ahmed & Bilal"
        placeholderTextColor="#445566"
        value={team1}
        onChangeText={setTeam1}
      />

      <Text style={styles.label}>Team / Player 2</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Omar & Zain"
        placeholderTextColor="#445566"
        value={team2}
        onChangeText={setTeam2}
      />

      <Text style={styles.label}>Match Format</Text>
      <View style={styles.toggle}>
        <TouchableOpacity
          style={[styles.toggleBtn, sets === 3 && styles.toggleActive]}
          onPress={() => setSets(3)}
        >
          <Text style={[styles.toggleText, sets === 3 && styles.toggleTextActive]}>
            Best of 3
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, sets === 5 && styles.toggleActive]}
          onPress={() => setSets(5)}
        >
          <Text style={[styles.toggleText, sets === 5 && styles.toggleTextActive]}>
            Best of 5
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Games Per Set</Text>
      <View style={styles.toggle}>
        <TouchableOpacity
          style={[styles.toggleBtn, gamesPerSet === 1 && styles.toggleActive]}
          onPress={() => setGamesPerSet(1)}
        >
          <Text style={[styles.toggleText, gamesPerSet === 1 && styles.toggleTextActive]}>
            1 Game
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, gamesPerSet === 3 && styles.toggleActive]}
          onPress={() => setGamesPerSet(3)}
        >
          <Text style={[styles.toggleText, gamesPerSet === 3 && styles.toggleTextActive]}>
            3 Games
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, gamesPerSet === 5 && styles.toggleActive]}
          onPress={() => setGamesPerSet(5)}
        >
          <Text style={[styles.toggleText, gamesPerSet === 5 && styles.toggleTextActive]}>
            5 Games
          </Text>
        </TouchableOpacity>
      </View>
        <TouchableOpacity
        style={[styles.button, !canStart && styles.buttonDisabled]}
        onPress={startMatch}
        disabled={!canStart}
      >
        <Text style={styles.buttonText}>Start Match →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f1923', padding: 24, paddingTop: 70 },
  back: { marginBottom: 24 },
  backText: { color: '#8899aa', fontSize: 16 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#8899aa', marginBottom: 36 },
  label: { color: '#8899aa', fontSize: 13, fontWeight: '600', marginBottom: 8, letterSpacing: 1 },
  input: {
    backgroundColor: '#1c2a38',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 16,
    marginBottom: 24,
  },
  toggle: { flexDirection: 'row', gap: 12, marginBottom: 40 },
  toggleBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#1c2a38',
    alignItems: 'center',
  },
  toggleActive: { backgroundColor: '#00c9a7' },
  toggleText: { color: '#8899aa', fontSize: 16, fontWeight: '600' },
  toggleTextActive: { color: '#fff' },
  button: {
    backgroundColor: '#00c9a7',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonDisabled: { backgroundColor: '#1c2a38' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});