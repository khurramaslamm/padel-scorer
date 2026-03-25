import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const POINTS = ['0', '15', '30', '40'];

export default function ScoreScreen() {
  const router = useRouter();
  const { team1, team2, sets, gamesPerSet } = useLocalSearchParams<{
    team1: string;
    team2: string;
    sets: string;
    gamesPerSet: string;
  }>();

  if (!team1 || !team2) return null;

  const setsToWin = sets === '5' ? 3 : 2;
  const gamesNeeded = Number(gamesPerSet) || 3;

  const [points, setPoints] = useState([0, 0]);
  const [games, setGames] = useState([0, 0]);
  const [setsWon, setSetsWon] = useState([0, 0]);
  const [inTiebreak, setInTiebreak] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [setScores, setSetScores] = useState<{t1: number, t2: number}[]>([]);

  const getPointLabel = (team: number) => {
    if (inTiebreak) return points[team].toString();
    const p0 = points[0];
    const p1 = points[1];
    if (p0 >= 3 && p1 >= 3) {
      if (p0 === p1) return 'Deuce';
      if (team === 0) return p0 > p1 ? 'Adv' : '40';
      if (team === 1) return p1 > p0 ? 'Adv' : '40';
    }
    return POINTS[points[team]];
  };

  const addPoint = (team: number) => {
    setHistory(prev => [...prev, { points, games, setsWon, inTiebreak, setScores }]);
    const newPoints = [...points];
    const newGames = [...games];
    const newSets = [...setsWon];
    const other = team === 0 ? 1 : 0;

    newPoints[team]++;

    // Tiebreak logic
      if (inTiebreak) {
      if (newPoints[team] >= 7 && newPoints[team] - newPoints[other] >= 2) {
        newSets[team]++;
        setSetScores(prev => [...prev, { t1: games[0], t2: games[1] }]);
        if (newSets[team] >= setsToWin) {
          endMatch(newSets);
          return;
        }
        setInTiebreak(false);
        setPoints([0, 0]);
        setGames([0, 0]);
        setSetsWon(newSets);
      } else {
        setPoints(newPoints);
      }
      return;
    }

    // Deuce/Advantage logic
    const p0 = newPoints[0];
    const p1 = newPoints[1];

    if (p0 >= 4 || p1 >= 4) {
      if (Math.abs(p0 - p1) >= 2) {
        newGames[team]++;
        newPoints[0] = 0;
        newPoints[1] = 0;
      }
    } else if (newPoints[team] >= 4) {
      newGames[team]++;
      newPoints[0] = 0;
      newPoints[1] = 0;
    }

    // Check for set win
    const g0 = newGames[0];
    const g1 = newGames[1];

    if (g0 >= gamesNeeded) {
      newSets[0]++;
      setSetScores(prev => [...prev, { t1: g0, t2: g1 }]);
      if (newSets[0] >= setsToWin) {
        endMatch(newSets);
        return;
      }
      newGames[0] = 0;
      newGames[1] = 0;
    } else if (g1 >= gamesNeeded) {
      newSets[1]++;
      setSetScores(prev => [...prev, { t1: g0, t2: g1 }]);
      if (newSets[1] >= setsToWin) {
        endMatch(newSets);
        return;
      }
      newGames[0] = 0;
      newGames[1] = 0;
    }

    setPoints(newPoints);
    setGames(newGames);
    setSetsWon(newSets);
  };

  const undoPoint = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setPoints(last.points);
    setGames(last.games);
    setSetsWon(last.setsWon);
    setInTiebreak(last.inTiebreak);
    setSetScores(last.setScores);
    setHistory(prev => prev.slice(0, -1));
  };

  const confirmQuit = () => {
    Alert.alert('Quit Match', 'Are you sure you want to abandon this match?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Quit', style: 'destructive', onPress: () => router.replace('/') },
    ]);
  };

  const endMatch = async (finalSets: number[]) => {
    const winner = finalSets[0] > finalSets[1] ? team1 : team2;
    const result = `${team1} ${finalSets[0]} — ${finalSets[1]} ${team2}`;
    const matchData = {
      team1,
      team2,
      result,
      winner,
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric',
      }),
    };

    const existing = await AsyncStorage.getItem('match_history');
    const history = existing ? JSON.parse(existing) : [];
    history.push(matchData);
    await AsyncStorage.setItem('match_history', JSON.stringify(history));

    router.replace({
      pathname: '/summary',
      params: matchData,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={confirmQuit}>
          <Text style={styles.quitText}>✕ Quit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={undoPoint}
          disabled={history.length === 0}
          style={[styles.undoBtn, history.length === 0 && styles.undoDisabled]}
        >
          <Text style={styles.undoText}>↩ Undo</Text>
        </TouchableOpacity>
      </View>

      {inTiebreak && (
        <Text style={styles.tiebreakBadge}>TIEBREAK</Text>
      )}

      <View style={styles.setsRow}>
        {setsWon.map((s, i) => (
          <Text key={i} style={styles.setsLabel}>
            {i === 0 ? team1 : team2}: {s} set{s !== 1 ? 's' : ''}
          </Text>
        ))}
      </View>

      {[0, 1].map((team) => (
        <TouchableOpacity
          key={team}
          style={[styles.card, team === 0 ? styles.card1 : styles.card2]}
          onPress={() => addPoint(team)}
          activeOpacity={0.85}
        >
          <Text style={styles.teamName}>
            {team === 0 ? team1 : team2}
          </Text>

          <Text style={styles.pointScore}>
            {getPointLabel(team)}
          </Text>

<View style={styles.gameRow}>
            {Array.from({ length: Number(sets) === 3 ? 3 : 5 }).map((_, si) => {
              const completed = si < setScores.length;
              const current = si === setScores.length;
              const score = completed ? (team === 0 ? setScores[si].t1 : setScores[si].t2) : null;
              const opponentScore = completed ? (team === 0 ? setScores[si].t2 : setScores[si].t1) : null;
              const won = completed && score! > opponentScore!;
              const lost = completed && score! < opponentScore!;

              return (
                <View
                  key={si}
                  style={[
                    styles.gameBubble,
                    won && styles.gameBubbleWon,
                    lost && styles.gameBubbleLost,
                  ]}
                >
                  <Text style={[styles.gameNum, lost && styles.gameNumLost]}>
                    {completed ? score : current ? games[team] : '·'}
                  </Text>
                </View>
              );
            })}
          </View>

          <Text style={styles.tapHint}>Tap to add point</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f1923', padding: 20, paddingTop: 60 },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  quitText: { color: '#ff4757', fontSize: 15, fontWeight: '600' },
  undoBtn: {
    backgroundColor: '#1c2a38',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  undoDisabled: { opacity: 0.3 },
  undoText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  tiebreakBadge: {
    color: '#ffa502',
    textAlign: 'center',
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 10,
    fontSize: 13,
  },
  setsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  setsLabel: { color: '#8899aa', fontSize: 13, fontWeight: '600' },
  card: {
    flex: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    padding: 20,
  },
  card1: { backgroundColor: '#00c9a7' },
  card2: { backgroundColor: '#1c6ef3' },
  teamName: { color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 10 },
  pointScore: { color: '#fff', fontSize: 72, fontWeight: '900', lineHeight: 80 },
  gameRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
 gameBubble: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameBubbleWon: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderWidth: 2,
    borderColor: '#fff',
  },
  gameBubbleLost: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  gameNum: { color: '#fff', fontSize: 18, fontWeight: '700' },
  gameNumLost: { color: 'rgba(255,255,255,0.4)' },
  tapHint: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 10 },
});