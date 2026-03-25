import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const [history, setHistory] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const loadHistory = async () => {
    const data = await AsyncStorage.getItem('match_history');
    if (data) setHistory(JSON.parse(data).reverse());
    else setHistory([]);
  };

  const clearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to delete all match history? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('match_history');
            setHistory([]);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎾 Padel Scorer</Text>
      <Text style={styles.subtitle}>Track your matches</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/setup')}>
        <Text style={styles.buttonText}>+ New Match</Text>
      </TouchableOpacity>

      {history.length > 0 && (
        <>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Recent Matches</Text>
            <TouchableOpacity onPress={clearHistory}>
              <Text style={styles.clearText}>🗑 Clear All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={history}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.teams}>{item.team1} vs {item.team2}</Text>
                <Text style={styles.result}>{item.result}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            )}
          />
        </>
      )}

      {history.length === 0 && (
        <Text style={styles.empty}>No matches yet. Start your first one!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f1923', padding: 24, paddingTop: 70 },
  title: { fontSize: 36, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#8899aa', textAlign: 'center', marginBottom: 40 },
  button: {
    backgroundColor: '#00c9a7',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 36,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyTitle: { color: '#8899aa', fontSize: 13, fontWeight: '600', letterSpacing: 1 },
  clearText: { color: '#ff4757', fontSize: 13, fontWeight: '600' },
  card: {
    backgroundColor: '#1c2a38',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  teams: { color: '#fff', fontSize: 16, fontWeight: '600' },
  result: { color: '#00c9a7', fontSize: 14, marginTop: 4 },
  date: { color: '#556677', fontSize: 12, marginTop: 4 },
  empty: { color: '#556677', textAlign: 'center', marginTop: 40, fontSize: 14 },
});