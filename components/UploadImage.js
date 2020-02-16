import * as React from 'react';
import { Button, Image, View,StyleSheet, TouchableOpacity,Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as UploadConstants from '../react-native-chat-server/ImageUploader';

export default class UploadImage extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <TouchableOpacity onPress= {this._pickImage}>
            <Text style= {styles.ImageButton}> Image</Text>
          </TouchableOpacity>
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1
    });
  

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      UploadConstants.uploadImage(result.uri)
      .then(url=> {alert('uploaded'); 
            this.setState({image: url})})
      .catch(error => console.log(error))
    }
  };
}

const styles = StyleSheet.create({
  ImageButton: {
     alignSelf: 'center',
    color: 'lightseagreen',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
});