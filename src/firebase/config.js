import { initializeApp } from 'firebase/app';
//import { getAnalytics } from 'firebase/analytics';
import {
    getAuth,
    signInWithEmailAndPassword,
} from 'firebase/auth';

import { getStorage } from 'firebase/storage';
import {  getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyC4SZkq_EXm4qsPhrzb2Ti_iyZqsT1-PVg',
    authDomain: 'web-clone-280e0.firebaseapp.com',
    databaseURL: 'https://web-clone-280e0-default-rtdb.firebaseio.com',
    projectId: 'web-clone-280e0',
    storageBucket: 'web-clone-280e0.appspot.com',
    messagingSenderId: '581288004736',
    appId: '1:581288004736:web:544e18efecc93ad9592a65',
    measurementId: 'G-TWR7HH5Y7P',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//connectAuthEmulator(auth, 'http://localhost:9099');

const storage = getStorage(app);
const db = getFirestore(app);

// if (window.location.hostname === 'localhost') {
//     connectFirestoreEmulator(db, 'localhost', 8080);
// }

// if (process.env.NODE_ENV === 'development') {
//     connectStorageEmulator(storage, 'localhost', 9199);
// }

const getAdmin = async (admin) => {
    const { email, password } = admin;
    try {
        const adminCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password,
        );
        const adminData = adminCredential.user;
        return adminData;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log('có lỗi từ server', errorCode, errorMessage);
    }
};


export { auth, storage, db, getAdmin };
