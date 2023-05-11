import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import API from './api';
import themeData from './configs/themeData';
import MovieListScreen from './screens/MovieListScreen';

// Starting API Server On App
API();

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <MovieListScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeData.BACKGROUND_COLOR,
  },
});

export default App;
