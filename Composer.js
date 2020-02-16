import React from 'react';
import {TextInput, View, KeyboardAvoidingView, TouchableOpacity, StyleSheet} from 'react-native';


export default class Composer extends React.Component{
	constructor(props){
		super(props)
		
	}


	render(){
		return(
			<KeyboardAvoidingView behavior="padding">
		        <View style= {styles.footer}>
		          <TextInput
		            value = {this.props.value}
		            onChangeText = {text => this.setState({...this.props.value: text})}
		            style = {styles.input}
		            underlineColorAndroid = "transparent"
		            placeholder = "Type Something nice"
		          />
		          <TouchableOpacity onPress= {this.props.onSend.bind(this)}>
		            <Text style= {styles.send}> Send</Text>
		          </TouchableOpacity>
		        </View>
      		</KeyboardAvoidingView>
			);
	}
}

const styles = StyleSheet.create({

	footer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
  },

  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    flex: 1
  },
   send: {
    alignSelf: 'center',
    color: 'lightseagreen',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20,
  },

});