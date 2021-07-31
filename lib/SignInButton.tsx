import React, { ReactElement } from 'react';
import { auth, googleAuthProvider } from './firebase';
import toast from 'react-hot-toast';
import Image from 'next/image';
import GoogleLogo from './assets/google.png';

export interface SignInButtonProps {}

export const SignInButton = (props: SignInButtonProps): ReactElement => {
	const signIn = async () => {
		if (!auth) {
			return;
		}
		try {
			await auth.signInWithPopup(googleAuthProvider);
		} catch (error) {
			toast.error(error.message);
		}
	};
	return (
		<button className="btn-google" onClick={signIn}>
			<Image src={GoogleLogo} alt="Google logo" width={40} height={40} />
			&nbsp;Sign in with Google
		</button>
	);
};
