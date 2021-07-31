import React, { ReactElement } from 'react';
import { auth } from './firebase';
import toast from 'react-hot-toast';

export interface SignOutButtonProps {}

export const SignOutButton = (props: SignOutButtonProps): ReactElement => {
	const signOut = async () => {
		if (!auth) {
			return;
		}
		try {
			await auth.signOut();
		} catch (error) {
			toast.error(error.message);
		}
	};
	return <button onClick={signOut}>Sign out</button>;
};
