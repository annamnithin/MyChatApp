import React from 'react';
import {FlatList,View,Text, StyleSheet, Image} from 'react-native';
import {send, subscribe} from './react-native-chat-server/index';

export default class MessagesList extends React.Component{

	renderItem({item}) {
    return (
      <View style={styles.row}>
       <Image style={styles.avatar} source={{uri: item.avatar}} />
       <View style={styles.rowText}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
      </View>
    );
  }


	render(){
		return(
				<FlatList data = {this.props.messages}
      			 renderItem = {this.renderItem}
      			 inverted/>
			);
	}

}

const styles = StyleSheet.create({
	row: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
	message: {
    fontSize: 18,
  },
  sender: {
    fontWeight: 'bold',
    paddingRight : 10,
  },
  avatar: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 10,
  },
  rowText: {
    flex: 1,
  },

});