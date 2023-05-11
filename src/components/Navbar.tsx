import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import themeData from '../configs/themeData';

const Navbar = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (val: string) => void;
}) => {
  const [searchOn, setSearchOn] = useState(false);
  return (
    <ImageBackground
      source={require('../assets/images/nav_bar.png')}
      resizeMode="cover"
      style={styles.navbar}>
      <TouchableOpacity style={styles.actionBtn} onPress={() => setSearch('')}>
        <Image
          source={require('../assets/images/Back.png')}
          style={styles.actionIcon}
        />
      </TouchableOpacity>
      {searchOn ? (
        <TextInput
          style={styles.searchInput}
          placeholder="Search Movies..."
          placeholderTextColor={'#fff8'}
          value={search}
          onChangeText={setSearch}
        />
      ) : (
        <Text style={styles.title}>Romantic Comedy</Text>
      )}
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => setSearchOn(prev => !prev)}>
        <Image
          source={require('../assets/images/search.png')}
          style={styles.actionIcon}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  actionBtn: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
  },
  title: {
    flex: 1,
    fontSize: 24,
    color: 'white',
    fontFamily: themeData.FONT_SEMI_BOLD,
  },
  searchInput: {
    flex: 1,
    fontSize: 24,
    color: 'white',
    fontFamily: themeData.FONT_SEMI_BOLD,
  },
});
