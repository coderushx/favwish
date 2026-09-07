import { initializeApp, getApps, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import firebaseConfig from '../../firebase-applet-config.json';

let app: App | null = null;
let authInstance: Auth | null = null;

export function getAdminAuth(): Auth | null {
  if (!authInstance) {
    try {
      if (!getApps().length) {
        app = initializeApp({
          projectId: firebaseConfig.projectId,
        });
      }
      authInstance = getAuth();
    } catch (e) {
      console.warn('Firebase admin initialization deferred:', e);
      return null;
    }
  }
  return authInstance;
}

export const adminAuth = {
  getUser: async (uid: string) => getAdminAuth()?.getUser(uid),
  getUserByEmail: async (email: string) => getAdminAuth()?.getUserByEmail(email),
};

