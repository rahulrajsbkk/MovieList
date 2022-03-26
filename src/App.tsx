import {useFonts} from 'expo-font';
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import themeData from './configs/themeData';

const App = () => {
  // Fonts On App
  const [loaded] = useFonts({
    TitilliumWebRegular: require('./assets/fonts/TitilliumWeb/TitilliumWeb-Regular.ttf'),
    TitilliumWebSemiBold: require('./assets/fonts/TitilliumWeb/TitilliumWeb-SemiBold.ttf'),
  });
  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
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
