import React, {Component} from "react";
import {GiftedChat, Bubble} from "react-native-gifted-chat";
import {ActionConst, Actions} from "react-native-router-flex";
import {
    View,
    Text,
    Platform,
    PermissionAndroid,
    Dimesions,
    ActivityIndicator,
    Alert,
    KeyboardsAvoidingView
} from "react-native";
import {AudioRecorder, AudioUtils} from "react-native-audio";
import propTypes from "prop-types";
import Ionicons from "react-native-vector-icons/Ionicons";
import Sound from "react-native-sound";
import {firebase} from "../react-native-chat-server/Firebase";
import NavigationBar from "react-native-navbar";

const ImagePicker = require("react-native-image-picker");

export default class Chat extends Component {
    static propTypes = {
        user: propTypes.object,
    };
    state = {
        messages: [],
        startAudio: false,
        hasPermission: false,
        audioPath: `${
            AudioUtils.DocumentDirectoryPath
        }/${this.messageIdGenerator()}test.aac`,
        playAudio: false,
        fetchChats: false,
        audioSettings: {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: "Low",
            AudioEncoding: "aac",
            MeteringEnabled: true,
            IncludeBase64: true,
            AudioEncodingBitRate: 32000
        }
    };

    componentWillMount(){
        console.log(this.props, "chat props")
        this.chats = firebase.ref(`/chat/${this.props.user.roomName}`)
        this.chats.on("value", snapshot => {
            if(!snapshot.val()) {
                this.setState({
                    fetchChats: true,
                });
                return;
            }
            let {messages} = snapshot.val();
            messages = messages.map(node => {
                const message = {};
                message._id = node._id;
                message.text = node.messageType === "message"? node.text : "";
                message.createdAt = node.createdAt;
                message.user = {
                    _id : node.user._id,
                    name : node.user.name,
                    avatar : node.user.avatar,
                };
                message.image = node.messageType === "image"? node.image: "";
                message.audio = node.messageType === "audio"? node.audio: "";
                message.messageType = node.messageType;
                return message;
            });
            this.setState({
                message: [...message]
            });
        });
    }

    componentDidMount() {
        this.checkPermission().then(async hasPermission=> {
            this.setState({hasPermission});
            if(!hasPermission) return;
            await AudioRecorder.preparedRecordingAtPath(
                this.state.audioPath,
                this.state.audioPathSettings,
            );
            AudioRecorder.onProgress = data => {
                console.log(data, "On progress data");
            };
            AudioRecorder.onFinished = data => {
                console.log(data, "on finish");
            };
        });
    }

    componentWillUnMount() {
        this.setState({
            messages: []
        });
    }

    checkPermission() {
        if(Platform.OS !== 'android'){
            return Promise.resolve(true);
        }

        const rationale = {
            title : "Microphone permission",
            message: "Audio needs access to your microphone so you can record audio."
        };

        return PermissionAndroid.request(
            PermissionAndroid.PERMISSIONS.RECORD_AUDIO,
            rationale
        ).then(result => {
            console.log("Permission resukt: ",result);
            return result === true || result === PermissionAndroid.RESULTS.GRANTED;
        });
    }

    renderAudio = props => {
        return !props.currentMessage.audio? (
            <View/>
        ):(
            <Ionicons
                name = "ios-play"
                size = {35}
                color = {this.state.playAudio? "red": "blue"}
                style = {{
                    left : 90,
                    position: "relative",
                    shadowColor : "#000",
                    shadowOffSet : {width: 0, height: 0},
                    shadowOpacity: 0.5,
                    backgroundColor : "transparent"
                }}
                onPress = {() => {
                    this.setState({
                        playAudio: true
                    });

                    const sound = new Sound(props.currentMessage.audio, "", error => {
                        if(error){
                            console.log("failed to load the sound", error);
                            
                        }
                        this.setState({playAudio: false});
                        sound.play(success => {
                            console.log("success play", success);
                            if(!success){
                                Alert.alert("there was a error playing this audio");
                            }
                        });
                    });
                }}
                />
        );
    };

    renderBubble = props => {
        
    }
}

