import React from 'react';
import {StyleSheet} from 'react-native';
import {Container} from 'native-base';
import {BASE_URL} from 'react-native-dotenv';
import Video from 'react-native-video';

import TopHeader from './Header';

export default function VideosLayout({navigation}) {
  const name = BASE_URL + navigation.getParam('name');

  return (
    <Container>
      <TopHeader drawer="true" text="HKSJ" />
      <Video
        paused={true}
        controls={true}
        source={{
          uri: name,
        }}
        style={styles.Video}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  Video: {
    height:'35%',
    margin: 5,
  },
});
