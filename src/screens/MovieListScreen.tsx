import {
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  View,
  Text,
  ImageProps,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {WToast} from 'react-native-smart-tip';
import Navbar from '../components/Navbar';
import themeData from '../configs/themeData';
import axios from 'axios';

type Movie = {
  name: string;
  'poster-image': string;
};

const MovieListScreen = () => {
  const [page, setPage] = useState<number>(1);
  const [haveNext, setHaveNext] = useState<boolean>(false);
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');

  // Get Movie Data From API
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/movies/${page}`)
      .then(({data}) => {
        setMovieList(prev => [...prev, ...data?.['content-items']?.content]);
        if (
          data?.['total-content-items'] >
          data?.['page-num-requested'] * data?.['page-size-requested']
        ) {
          setHaveNext(true);
        } else {
          setHaveNext(false);
        }
      })
      .catch(e => {
        return WToast.show({
          data: e?.message || 'Something Went Wrong',
          position: WToast.position.BOTTOM,
        });
      })
      .finally(() => setIsLoading(false));
  }, [page]);

  // Select Image From Asset With
  const getImage = useCallback((key: string) => {
    switch (key) {
      case 'poster1.jpg':
        return require('../assets/images/poster1.jpg');
      case 'poster2.jpg':
        return require('../assets/images/poster2.jpg');
      case 'poster3.jpg':
        return require('../assets/images/poster3.jpg');
      case 'poster4.jpg':
        return require('../assets/images/poster4.jpg');
      case 'poster5.jpg':
        return require('../assets/images/poster5.jpg');
      case 'poster6.jpg':
        return require('../assets/images/poster6.jpg');
      default:
        return require('../assets/images/placeholder_for_missing_posters.png');
    }
  }, []);

  const imageSize = useMemo(() => {
    // To Set Width of Card
    const width = (Dimensions.get('window').width - 24) / 3;
    // Ratio w.r.t. image
    const ratio = width / 182;
    // Card Image Height
    const height = ratio * 272;
    return {width, height};
  }, []);

  const renderItem = ({item}: {item: Movie}) => (
    <MovieCard
      image={getImage(item['poster-image'])}
      name={item.name}
      imageSize={imageSize}
    />
  );

  const loadMore = useCallback(() => {
    if (haveNext && !isLoading) {
      setPage(prev => prev + 1);
    }
  }, [haveNext, isLoading]);

  return (
    <View style={styles.viewIn}>
      <Navbar search={search} setSearch={setSearch} />
      <FlatList
        style={styles.movieList}
        contentContainerStyle={styles.movieListIn}
        numColumns={3}
        horizontal={false}
        data={movieList.filter(item =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        )}
        renderItem={renderItem}
        keyExtractor={(item, i) => `${i}${item.name}`}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponentStyle={styles.listFooterComponentStyle}
        ListFooterComponent={
          isLoading ? <ActivityIndicator size="small" color="#fff" /> : null
        }
      />
    </View>
  );
};

const MovieCard = ({
  image,
  name,
  imageSize,
}: {
  name: string;
  image: ImageProps;
  imageSize: {width: number; height: number};
}) => {
  return (
    <View style={[styles.movieCard, {width: imageSize.width}]}>
      <Image
        source={image}
        style={[
          styles.image,
          {
            height: imageSize.height,
          },
        ]}
      />
      <Text style={styles.movieName}>{name}</Text>
    </View>
  );
};

export default MovieListScreen;

const styles = StyleSheet.create({
  viewIn: {
    flex: 1,
    position: 'relative',
  },
  movieList: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 3,
  },
  movieListIn: {
    paddingBottom: 30,
  },
  movieCard: {
    marginHorizontal: 3,
    marginTop: 3,
    marginBottom: 27,
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
  listFooterComponentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
  },
});
