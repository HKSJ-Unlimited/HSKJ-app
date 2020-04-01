import React, {useState, useEffect} from 'react';
import {Linking} from 'react-native';
import {Layout, ListItem, Text} from '@ui-kitten/components';
import {gihubAPI} from '../../utils/APi';

import Loader from '../Loader';

const Download_Changelog = () => {
  const [state, setState] = useState({
    data: null,
  });
  const regex = /app|-release.apk|-/gi
  const _getData = async () => {
    const response = await gihubAPI();
    setState({data: response});
  };

  useEffect(() => {
    _getData();
  }, []);

  return (
    <Layout style={{flex: 1}}>
      {state.data ? (
        <Layout style={{flex: 1}}>
          <ListItem
            title="Version"
            titleStyle={{fontSize: 25}}
            description={state.data.name}
            descriptionStyle={{fontSize: 16, marginTop: 5}}
            style={{marginTop: '25%'}}></ListItem>
          <ListItem
            title="Author"
            titleStyle={{fontSize: 25}}
            description={state.data.author.login}
            descriptionStyle={{fontSize: 16, marginTop: 5}}
            style={{marginTop: '10%'}}></ListItem>
          <ListItem
            title="Changelog"
            titleStyle={{fontSize: 25}}
            description={state.data.body}
            descriptionStyle={{fontSize: 16, marginTop: 5}}
            style={{marginTop: '10%'}}></ListItem>
          <ListItem
            onPress={() =>
              Linking.openURL(state.data.assets[0].browser_download_url)
            }
            title={'Download '+state.data.assets[0].name.replace(regex,'')+' App'}
            titleStyle={{fontSize: 25}}
            description={state.data.assets[0].name}
            descriptionStyle={{fontSize: 16, marginTop: 5}}
            style={{marginTop: '10%'}}></ListItem>
          <ListItem
            onPress={() =>
              Linking.openURL(state.data.assets[1].browser_download_url)
            }
            title={'Download '+state.data.assets[1].name.replace(regex,'')+' App'}
            titleStyle={{fontSize: 25}}
            description={state.data.assets[1].name}
            descriptionStyle={{fontSize: 16, marginTop: 5}}
            style={{marginTop: '10%'}}></ListItem>
            
        </Layout>
      ) :  <Loader />}
    </Layout>
  );
};

export default Download_Changelog;
