import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyCBV9hlV7BgodCKQFc1rmJ_uZp8fGRd_Zk',
  authDomain: 'boysakconstructionbois-4ddb8.firebaseapp.com',
  databaseURL: 'https://boysakconstructionbois-4ddb8-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'boysakconstructionbois-4ddb8',
  storageBucket: 'boysakconstructionbois-4ddb8.firebasestorage.app',
  messagingSenderId: '313161485766',
  appId: '1:313161485766:web:9d8f08cf777ec38f03f6c7',
  measurementId: 'G-94HQEEKQJ2'
}

const firebaseApp = initializeApp(firebaseConfig)

if (typeof window !== 'undefined') {
  isSupported()
    .then((supported: boolean) => {
      if (supported) {
        getAnalytics(firebaseApp)
      }
    })
    .catch(() => {
      /* ignore analytics init errors */
    })
}

export const db = getDatabase(firebaseApp)
export { firebaseApp }
