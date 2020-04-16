import React from 'react';
import {Layout as View, Spinner} from '@ui-kitten/components';

const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
      }}>
      <Spinner status="warning" size="giant" />
    </View>
  );
};

export default Loader;
