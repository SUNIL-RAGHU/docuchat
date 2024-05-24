// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8vse6kpiwrl_HxeH8kyfRvPagCk1qEgo",
  authDomain: "docuchat-f3f83.firebaseapp.com",
  projectId: "docuchat-f3f83",
  storageBucket: "docuchat-f3f83.appspot.com",
  messagingSenderId: "801561542423",
  appId: "1:801561542423:web:032802ad4175fb28aac152"
};

const firebaseApp = initializeApp(firebaseConfig);

module.exports = firebaseApp;
