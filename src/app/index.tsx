import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fortuna SIMS</Text>

      <Text style={styles.subtitle}>
        Supply & Inventory Management System
      </Text>

      <Text style={styles.version}>
        Mobile App v1.0 🚀
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#cbd5e1',
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },

  version: {
    color: '#38bdf8',
    fontSize: 16,
    marginTop: 30,
  },
});