import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
	apiKey: "AIzaSyCKvLaXbLHNXT1uYEpBBxxM-fDAWZt7Gao",
	authDomain: "nextfire-b1abd.firebaseapp.com",
	projectId: "nextfire-b1abd",
	storageBucket: "nextfire-b1abd.appspot.com",
	messagingSenderId: "167668142121",
	appId: "1:167668142121:web:f080704c4300e1dc440c38",
};

if (!firebase.app.length) {
	firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
