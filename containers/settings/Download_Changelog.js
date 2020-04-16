import React, {useState, useEffect} from 'react';
import {Linking, ScrollView} from 'react-native';
import {Layout, ListItem} from '@ui-kitten/components';
import DeviceInfo from 'react-native-device-info';

import {gihubAPI} from '../../utils/APi';
import Loader from '../Loader';

const Download_Changelog = () => {
  const [state, setState] = useState({
    data: null,
  });

  const [arch, setArch] = useState('');
  const regex = /app|-release.apk|-/gi;
  const installedVersion = DeviceInfo.getVersion();

  const _getData = async () => {
    const response = await gihubAPI();
    setState({data: response});
  };

  const _getCpuArch = async () => {
    const cpuArch = await DeviceInfo.supportedAbis();
    if (cpuArch.includes('arm64-v8a')) {
      setArch('64 bit');
    } else {
      setArch('only 32 bit');
    }
  };
  useEffect(() => {
    _getCpuArch();
    _getData();
  }, []);

  return (
    <Layout style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {state.data ? (
          <Layout style={{flex: 1}}>
            <ListItem
              title="Latest Version"
              titleStyle={{fontSize: 20}}
              description={state.data.name}
              descriptionStyle={{fontSize: 16, marginTop: 5}}
              style={{marginTop: '20%'}}
            />
            <ListItem
              title="Version Installed"
              titleStyle={{fontSize: 20}}
              description={installedVersion}
              descriptionStyle={{fontSize: 16, marginTop: 5}}
              style={{marginTop: '5%'}}
            />
            <ListItem
              title="Author"
              titleStyle={{fontSize: 20}}
              description={state.data.author.login}
              descriptionStyle={{fontSize: 16, marginTop: 5}}
              style={{marginTop: '5%'}}
            />
            <ListItem
              title="Latest Changelog"
              titleStyle={{fontSize: 20}}
              description={state.data.body}
              descriptionStyle={{fontSize: 16, marginTop: 5}}
              style={{marginTop: '5%'}}
            />
            <ListItem
              title="Download Latest Version from below"
              titleStyle={{fontSize: 20}}
              description={'You phone supports ' + arch}
              descriptionStyle={{fontSize: 16, marginTop: 5}}
              style={{marginTop: '5%'}}
            />
            <ListItem
              onPress={() =>
                Linking.openURL(state.data.assets[0].browser_download_url)
              }
              title={
                'Download ' +
                state.data.assets[0].name.replace(regex, '') +
                ' App'
              }
              titleStyle={{fontSize: 25}}
              description={state.data.assets[0].name}
              descriptionStyle={{fontSize: 16, marginTop: 5}}
              style={{marginTop: '10%'}}
            />
            <ListItem
              onPress={() =>
                Linking.openURL(state.data.assets[1].browser_download_url)
              }
              title={
                'Download ' +
                state.data.assets[1].name.replace(regex, '') +
                ' App'
              }
              titleStyle={{fontSize: 25}}
              description={state.data.assets[1].name}
              descriptionStyle={{fontSize: 16, marginTop: 5}}
              style={{marginTop: '10%'}}
            />
          </Layout>
        ) : (
          <Loader />
        )}
      </ScrollView>
    </Layout>
  );
};

export default Download_Changelog;
