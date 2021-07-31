import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from './firebase';
import firebase from 'firebase';

export const useUserData = () => {
	const [user] = useAuthState(auth);
	const [username, setUsername] = useState<string | null>(null);

	useEffect(() => {
		let unsubscribe;

		if (!user) {
			setUsername(null);
			return;
		}

		const ref = firestore.collection('users').doc(user.uid);
		unsubscribe = ref.onSnapshot(
			(
				doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
			) => {
				const data = doc.data();
				if (!data) {
					setUsername(null);
					return;
				}
				if (!data.username) {
					setUsername(null);
					return;
				}
				setUsername(data.username);
			}
		);

		return unsubscribe;
	}, [user]);

	return { username, user };
};
