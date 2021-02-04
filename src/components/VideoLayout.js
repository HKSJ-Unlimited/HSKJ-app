import React from 'react';
import {
    Dimensions,
    StyleSheet,
    PermissionsAndroid,
    StatusBar,
    BackHandler,
    TouchableWithoutFeedback,
    Animated,
    TouchableOpacity, Text, View, ToastAndroid
} from 'react-native';
import { BASE_URL } from 'react-native-dotenv';
import RNFetchBlob from 'rn-fetch-blob';
import { BannerAdSize } from '@react-native-firebase/admob';
import Orientation from 'react-native-orientation';
import Video from 'react-native-video';
import Icon from "react-native-vector-icons/FontAwesome";
import Feather from 'react-native-vector-icons/Feather';

import GoogleADBanner from './GoogleADBanner';
import { FullscreenClose, FullscreenOpen } from '../assets/icons';
import { lightTheme } from '../theme/light-theme';
import { colors, darkTheme } from '../theme/dark-theme';
import PlayerControls from './PlayerControls';
import ProgressBar from './ProgressBar';

export default class VideoLayout extends React.Component {
    state = {
        fullscreen: false,
        duration: 0,
        currentTime: 0,
        isLoading: true,
        paused: false,
        play: false,
        name: null,
        showControls: false,
        buffering: true,
        animated: new Animated.Value(0),
        themeMode: this.props.themeMode
    };
    _onLoadHandler = data => {
        this.triggerBufferAnimation();
        this.setState(s => ({
            ...s,
            duration: data.duration,
        }));
    };

    _HandleProgress = data => {
        this.setState(s => ({
            ...s,
            currentTime: data.currentTime,
        }));
    };

    _handleOrientation = orientation => {
        orientation === 'LANDSCAPE'
            ? this.setState({ fullscreen: true })
            : this.setState({ fullscreen: false });
    };

    _HandleFullscreen = () => {
        Orientation.unlockAllOrientations();
        this.state.fullscreen
            ? Orientation.lockToPortrait()
            : Orientation.lockToLandscapeLeft();
    };
    _backHandler = () => {
        Orientation.unlockAllOrientations();
        Orientation.lockToPortrait();
    };
    async componentDidMount() {
        const regex = /%23/gi;
        const str = this.props.name.replace(regex, '%2523')
        const name = BASE_URL + str;
        this.setState({ name });
        BackHandler.addEventListener('hardwareBackPress', this._backHandler);
        Orientation.addOrientationListener(this._handleOrientation);
    }
    componentWillUnmount() {
        Orientation.removeOrientationListener(this._handleOrientation);
        BackHandler.removeEventListener('hardwareBackPress', this._backHandler);
    }
    componentDidUpdate(prevProps) {
        if (this.props.themeMode !== prevProps.themeMode) {
            this.setState({ themeMode: this.props.themeMode })
        }
    }

    renderToolbar = () => (
        <View>
            <Text> {this.props.name} </Text>
        </View>
    );

    onPaused = playerState => {
        this.setState({
            paused: !this.state.paused,
            playerState,
        });
    };

    onSeek = seek => {
        // alert(JSON.stringify(seek))
        this.player.seek(seek.seekTime);
    };

    onSeeking = currentTime => this.setState({ currentTime });

    _showControls = () => {
        this.state.showControls
            ? this.setState({ showControls: false })
            : this.setState({ showControls: true }, () =>
                setTimeout(
                    () => this.setState(s => ({ ...s, showControls: false })),
                    1500,
                ),
            );
    };

    handlePlayPause = () => {
        if (this.state.play) {
            this.setState({ play: false, showControls: true });
            return;
        }
        this.setState({ play: true });
        setTimeout(() => this.setState(s => ({ ...s, showControls: false })), 3000);
    };
    skipBackward = () => {
        this.player.seek(this.state.currentTime - 15);
        this.setState({ currentTime: this.state.currentTime - 15 });
    };

    skipForward = () => {
        this.player.seek(this.state.currentTime + 15);
        this.setState({ currentTime: this.state.currentTime + 15 });
    };

    triggerBufferAnimation = () => {
        this.loopingAnimation && this.loopingAnimation.stopAnimation();
        this.loopingAnimation = Animated.loop(
            Animated.timing(this.state.animated, {
                toValue: 1,
                duration: 350,
                useNativeDriver: true
            }),
        ).start();
    };

    _handleBuffer = meta => {
        meta.isBuffering && this.triggerBufferAnimation();

        if (this.loopingAnimation && !meta.isBuffering) {
            this.loopingAnimation.stopAnimation();
        }

        this.setState({
            buffering: meta.isBuffering,
        });
    };
    download = () => {
        this.requestStoragePermission();
    };
    requestStoragePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'HKSJ needs Storage Permission',
                    message:
                        'HKSJ needs access to your Device Storage uwu ' +
                        'so you can fap when offline.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                let dirs = RNFetchBlob.fs.dirs.DownloadDir + '/HKSJ';
                const android = RNFetchBlob.android;
                const fileName = this.state.name.replace(BASE_URL, '');
                RNFetchBlob.config({
                    addAndroidDownloads: {
                        useDownloadManager: true,
                        notification: true,
                        description: 'File downloaded.',
                        path: dirs + `/${fileName}`,
                        mediaScannable: true,
                        title: fileName,
                    },
                })
                    .fetch('GET', this.state.name)
                    .then(res => {
                        android.actionViewIntent(res.path(), 'image/png');
                    })
                    .catch(err => {
                        alert('Deer you canceled the download');
                    });
            } else {
                Alert('Cum on Nibba you want to download or not?');
            }
        } catch (err) {
            console.log(err);
        }
    }
    _onLoadStart = () => {
        // this.setState({ buffering: true });
        // this.triggerBufferAnimation();
    }
    _videoError = error => {
        console.log(error);
        ToastAndroid.showWithGravity(`There's some issue with this video, either download it or watch another one`, ToastAndroid.LONG, ToastAndroid.CENTER)
    }

    render() {
        const { buffering } = this.state;
        const interpolatedAnimation = this.state.animated.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        });

        const rotateStyle = {
            transform: [{ rotate: interpolatedAnimation }],
        };
        return (
            <View style={{ marginLeft: -10 }}>
                <StatusBar hidden={this.state.fullscreen} />
                {!this.state.fullscreen &&
                    <View style={[styles.header, { backgroundColor: this.state.themeMode === 'light' ? '#F2F6FF' : '#2C3335' }]}>
                        <Feather
                            name="arrow-left"
                            size={25}
                            onPress={() => this.props.navigation.goBack()}
                            style={[this.state.themeMode === 'light' ? lightTheme.icon : darkTheme.icon, { paddingLeft: 5 }]}
                        />
                        <Text style={[styles.heading, { color: this.state.themeMode === 'light' ? lightTheme.text.color : colors.PrimaryColor }]}>{this.props.heading}</Text>
                    </View>}
                <TouchableWithoutFeedback onPress={this._showControls}>
                    <View >
                        {this.state.name && <Video
                            controls={false}
                            ref={ref => {
                                this.player = ref;
                            }}
                            onBuffer={this._handleBuffer}
                            onLoad={this._onLoadHandler}
                            // onLoadStart={this._onLoadStart}
                            style={
                                this.state.fullscreen ? styles.fullscreenVideo : styles.video
                            }
                            source={{
                                uri: this.state.name,
                            }}
                            onEnterFullscreen={this._HandleFullscreen}
                            onExitFullscreen={this._HandleFullscreen}
                            onProgress={this._HandleProgress}
                            paused={this.state.play}
                            resizeMode="contain"
                            onError={this._videoError}
                        />}
                        <View style={styles.videoCover}>
                            {buffering && (
                                <Animated.View style={rotateStyle}>
                                    <Icon name="circle-o-notch" size={50} color="white" />
                                </Animated.View>
                            )}
                        </View>
                        {this.state.showControls && (
                            <View style={styles.controlOverlay}>
                                <TouchableOpacity
                                    onPress={this._HandleFullscreen}
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                    style={styles.fullscreenButton}>
                                    {this.state.fullscreen ? (
                                        <FullscreenClose />
                                    ) : (
                                            <FullscreenOpen />
                                        )}
                                </TouchableOpacity>
                                <PlayerControls
                                    onPlay={this.handlePlayPause}
                                    onPause={this.handlePlayPause}
                                    playing={this.state.play}
                                    showPreviousAndNext={false}
                                    showSkip={true}
                                    skipBackwards={this.skipBackward}
                                    skipForwards={this.skipForward}
                                    onB
                                />
                                <ProgressBar
                                    currentTime={this.state.currentTime}
                                    duration={this.state.duration > 0 ? this.state.duration : 0}
                                    onSlideStart={this.handlePlayPause}
                                    onSlideComplete={this.handlePlayPause}
                                    onSlideCapture={this.onSeek}
                                />
                            </View>
                        )}
                    </View>
                </TouchableWithoutFeedback>

                {!this.state.fullscreen && (
                    <>
                        <TouchableOpacity full style={[styles.button, { backgroundColor: this.state.themeMode === 'light' ? '#eee' : colors.PrimaryColor }]} onPress={() => this.download()}>
                            <Text style={{
                                color: this.state.themeMode === 'light' ? lightTheme.text.color : darkTheme.buttonText.color,
                                fontSize: 18, textAlign: 'center'
                            }}>Download</Text>
                        </TouchableOpacity>
                        <View style={styles.banner}>
                            <GoogleADBanner type={BannerAdSize.BANNER} name="VIDEO_TOP" />
                            <GoogleADBanner
                                type={BannerAdSize.MEDIUM_RECTANGLE}
                                name="VIDEO_BOTTOM"
                            />
                        </View>
                    </>
                )}
            </View>
        );
    }
}
const SCREEN_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    Video: {
        width: Dimensions.get('window').width * (9 / 16),
        // height:350
    },
    banner: {
        flex: 1,
        alignSelf: 'center',
        flexDirection: 'column',
        marginTop: '5%'
    },
    button: {
        marginHorizontal: '20%',
        marginBottom: 5,
        marginTop: 15,
        borderRadius: 10,
        padding: 10
    },
    video: {
        // flex: 1,
        height: Dimensions.get('window').width * (9 / 16),
        width: Dimensions.get('window').width,
        backgroundColor: 'black',
        marginTop: 10,
    },
    fullscreenVideo: {
        height: Dimensions.get('window').width,
        width: Dimensions.get('screen').height,
        backgroundColor: 'black',
    },
    fullscreenButton: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
        paddingRight: 10,
    },
    controlOverlay: {
        position: 'absolute',
        top: 5,
        bottom: 0,
        left: 5,
        right: 0,
        width: '100%',
        backgroundColor: '#000000c4',
        opacity: 0.9,
        justifyContent: 'space-between',

    },
    videoCover: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "transparent",
    },
    buffering: {
        backgroundColor: '#000',
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '11%',
        width: SCREEN_WIDTH - 10,
        margin: 5,
        borderRadius: 6,
        elevation: 3,
        marginBottom: 10
    },
    heading: {
        fontSize: 18,
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 1,
        textAlign: 'center',
        marginLeft: -10
    },
});