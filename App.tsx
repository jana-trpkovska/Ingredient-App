import 'react-native-get-random-values';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';
import { initDB } from './src/services/database';
import { useEffect } from 'react';

export default function App() {

  useEffect(() => {
  try {
    initDB();
    console.log('Database initialized');
  } catch (error) {
    console.log('Database initialization error:', error);
  }
}, []);


  return (
  <>
    <StatusBar style="dark" />
    <AppNavigator />
  </>
  );
}
