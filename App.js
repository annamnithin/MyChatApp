import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, KeyboardAvoidingView, TouchableOpacity, Image,Button } from 'react-native';
import {send, subscribe} from './react-native-chat-server/index';
import Header from './Header';
import MessagesList from './MessageList'
import UploadImage from './components/UploadImage'

const NAME = 'Your Name';
const CHANNEL = 'MyChatApp';
const AVATAR = 'https://pbs.twimg.com/profile_images/806501058679816192/ZHFWIF-z_400x400.jpg';

export default class App extends React.Component {

  state = {
    typing : "",
    messages: [],
    image: null,
  };

 componentDidMount(){
  subscribe(CHANNEL, messages=>{
    this.setState({messages});
    console.log(messages)
  });
 }


 async sendMessage() {
  //send message to channel with user name

  await send({
    channel: CHANNEL,
    sender: NAME,
    avatar: AVATAR,
    message :  this.state.typing
  });

  this.setState({
    typing: '',
  });

 }

  renderItem({item}) {
    return (
      <View style={styles.row}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    );
  }

  render(){
    let {image} = this.state;
    return (
    <View style={styles.container}>
      <Header title = {CHANNEL} />
      <MessagesList messages = {this.state.messages}/>
      <KeyboardAvoidingView behavior="padding">
        <View style= {styles.footer}>
          <View >
           <UploadImage />
          </View>
          <TextInput
            value = {this.state.typing}
            onChangeText = {text => this.setState({typing: text})}
            style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Type Something nice"
          />
          <TouchableOpacity onPress= {this.sendMessage.bind(this)}>
            <Text style= {styles.send}> Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );  
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  

  footer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
  },

  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    flex: 4
  },
   send: {
    alignSelf: 'center',
    color: 'lightseagreen',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20,
  },
  ImageButton: {
     alignSelf: 'center',
    color: 'lightseagreen',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },

});
