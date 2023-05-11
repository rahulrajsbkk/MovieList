import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import themeData from '../configs/themeData';

const MovieCard = ({
  image,
  name,
  imageSize,
}: {
  name: string;
  image: ImageSourcePropType;
  imageSize: {width: number; height: number};
}) => {
  return (
    <View style={styles.movieCard}>
      <Image
        source={image}
        style={[
          styles.image,
          {
            height: imageSize.height,
          },
        ]}
      />
      <Text numberOfLines={1} style={styles.movieName}>
        {name}
      </Text>
    </View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  movieCard: {
    paddingHorizontal: 3,
    paddingTop: 3,
    paddingBottom: 27,
    flex: 1 / 3,
  },
  image: {
    width: '100%',
    marginBottom: 8,
  },
  movieName: {
    fontSize: 15,
    color: 'white',
    fontFamily: themeData.FONT_SEMI_REGULAR,
  },
});
