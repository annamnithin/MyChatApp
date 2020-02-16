import firebase from './Firebase';
import {Platform} from 'react-native';
// import RNFetchBlob from 'rn-fetch-blob';

// const Blob = RNFetchBlob.polyfill.Blob;
// const fs = RNFetchBlob.fs;
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
// window.Blob = Blob;

export const uploadImage = (uri, mime='application/octet-stream') => {
		return new Promise((resolve, reject) => {
			const uploadUri = Platform.OS === 'ios'? uri.replace('file://', ''): uri
			const sessionId = new Date().getTime()
			let uploadBob = null

			//creating a reference in firebase storage for the file
			const imageRef = firebase.storage().ref('MyImages');
			//encode data with base64 prior to uploading
			fetch(uri)
			.then(response => response.blob())
			//Place the blob into storage reference
			.then(blob => 
				imageRef.put(blob, {contentType: mime}))
			//from here you can get the download url of the image
			// to store a reference to it in your database
			.then(() => {
				return imageRef.getDownloadURL()
			})
			.then((url)=> {
				resolve(url)
				storeReference(url,sessionId)
			})
			.catch((error) => {
				reject(error)
			});
		})
	}

export const _uploadFile = async(uri) => {
	try{
		//use fetch API to convert the local image to a blob
		// for uploading to firebase
		 const response2 = await fetch(uri);
      	 const blob = await response2.blob();

      	//upload to firebase using blob

      	const ref = firebase
      	.storage()
      	.ref("Images")
      	.child(new Date().getTime() + "")

      	const task = ref.put(blob);

      	task.on(
      		firebase.storage.TaskEvent.STATE_CHANGED,
      		 snapshot =>
        	  console.log(snapshot.bytesTransferred / snapshot.totalBytes * 100),
        	error => {
          		console.log("error", error);
          	return error;
        },
        result => {
        		console.log("result", task.snapshot.metadata);
        		return result;
        	}
      	);

	} catch(e){
		console.log(e);
	}
};

const storeReference = (downloadUrl, sessionId) => {
	let imageRef = firebase.storage().ref('MyImages')
	let currentUser = firebase.auth().currentUser
	let image = {
		type: 'image',
		url: downloadUrl,
		createdAt: sessionId,
		user: {
			id: currentUser.uid,
			email: currentUser.email
		}
	}
		firebase.database().ref('Images')
		.push(image)
	}


