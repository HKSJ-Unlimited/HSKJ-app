import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Layout as View} from '@ui-kitten/components';

import TopHeader from './Header';

export default class Layout extends Component {
  render() {
    return (
      <View>
        <TopHeader drawer="true" text={this.props.name} />
        <View contentContainerStyle={styles.content}>
          {this.props.children}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 10,
    marginTop: '5%',
    fontFamily: 'roboto',
  },
});
