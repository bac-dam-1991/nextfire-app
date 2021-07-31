import React, { ReactElement } from 'react';
import { useUserContext } from '../lib/context';
import { auth, googleAuthProvider } from '../lib/firebase';
import toast from 'react-hot-toast';

export interface EnterPageProps {}

const EnterPage = (props: EnterPageProps): ReactElement => {
	const { username, user } = useUserContext();
	return (
		<main>
			{user ? (
				username ? (
					<SignOutButton />
				) : (
					<UsernameForm />
				)
			) : (
				<SignInButton />
			)}
		</main>
	);
};

export default EnterPage;

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
			Sign in
		</button>
	);
};

export const UsernameForm = (): ReactElement => {
	return <form>Form</form>;
};
