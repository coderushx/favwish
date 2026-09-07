import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const config = firebaseConfig as any;
const app = initializeApp(firebaseConfig as any);
export const auth = getAuth(app);
auth.useDeviceLanguage();
export const db = config && config.firestoreDatabaseId 
  ? getFirestore(app, config.firestoreDatabaseId) 
  : getFirestore(app);
export const googleAuthProvider = new GoogleAuthProvider();

