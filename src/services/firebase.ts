import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/analytics'

firebase.initializeApp({
  apiKey: "AIzaSyCjrRHbyaW8LdGWF1rQQ9fizYfadVdaz8s",
  authDomain: "letmeask-nlw-together-64f3b.firebaseapp.com",
  databaseURL: "https://letmeask-nlw-together-64f3b-default-rtdb.firebaseio.com",
  projectId: "letmeask-nlw-together-64f3b",
  storageBucket: "letmeask-nlw-together-64f3b.appspot.com",
  messagingSenderId: "653939351006",
  appId: "1:653939351006:web:c6d99485320835c51dd14f",
  measurementId: "G-XHB5Z0WXQE"
})

firebase.analytics()

const auth = firebase.auth()
const db = firebase.database()

export {
  auth,
  db,
  firebase
}