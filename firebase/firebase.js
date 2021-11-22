import app from '@react-native-firebase/app';

import '@react-native-firebase/firestore';

import firebaseConfig from './config';

class Firebase {
    constructor() {
        if(!app.apps.length){
            app.initializeApp(firebaseConfig);
            //firebase.firestore().settings({ experimentalForceLongPolling: true }); //add this..
        }
        this.db = app.firestore(); // habilitar acceder a firestore de firebase
    }
}

const firebase = new Firebase();

export default firebase;