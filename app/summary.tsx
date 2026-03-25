import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SummaryScreen() {
  const router = useRouter();
  const { team1, team2, result, winner } = useLocalSearchParams<{
    team1: string;
    team2: string;
    result: string;
    winner: string;
  }>();

  return (
    <View style={styles.container}>
      <Text style={styles.trophy}>🏆</Text>
      <Text style={styles.winnerLabel}>Winner</Text>
      <Text style={styles.winner}>{winner}</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Final Score</Text>
        <Text style={styles.result}>{result}</Text>
      </View>

     <View style={styles.teamsCard}>
        <View style={[styles.teamBlock, { justifyContent: 'flex-start' }]}>
          <View style={[styles.dot, { backgroundColor: '#00c9a7' }]} />
          <Text style={styles.teamName}>{team1}</Text>
        </View>
        <Text style={styles.vs}>vs</Text>
        <View style={[styles.teamBlock, { justifyContent: 'flex-end' }]}>
          <Text style={styles.teamName}>{team2}</Text>
          <View style={[styles.dot, { backgroundColor: '#1c6ef3' }]} />
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/setup')}
      >
        <Text style={styles.buttonText}>🎾 Play Again</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => router.replace('/')}
      >
        <Text style={styles.homeButtonText}>← Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1923',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  trophy: { fontSize: 72, marginBottom: 16 },
  winnerLabel: {
    color: '#8899aa',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 2,
    marginBottom: 8,
  },
  winner: {
    color: '#00c9a7',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 40,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1c2a38',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardLabel: {
    color: '#8899aa',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 10,
  },
  result: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  teamsCard: {
    backgroundColor: '#1c2a38',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  teamBlock: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  teamName: { color: '#fff', fontSize: 15, fontWeight: '600', flexShrink: 1 },
  vs: { color: '#445566', fontSize: 14, fontWeight: '600', marginHorizontal: 8 },
  button: {
    backgroundColor: '#00c9a7',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  homeButton: {
    paddingVertical: 14,
    alignItems: 'center',
    width: '100%',
  },
  homeButtonText: { color: '#8899aa', fontSize: 16 },
});