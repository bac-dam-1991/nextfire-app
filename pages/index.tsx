import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import firebase, { initialiseFirebase } from "../lib/firebase";

export interface HomePageProps {}

const HomePage = (props: HomePageProps) => {
	const user = null;
	const username = null;

	const [auth, setAuth] = useState<firebase.auth.Auth | null>(null);
	const [googleAuthProvider, setGoogleAuthProvider] =
		useState<firebase.auth.GoogleAuthProvider | null>(null);
	const [storage, setStorage] = useState<firebase.storage.Storage | null>(
		null
	);
	const [firestore, setFirestore] =
		useState<firebase.firestore.Firestore | null>(null);

	useEffect(() => {
		try {
			const { auth, googleAuthProvider, firestore, storage } =
				initialiseFirebase();
			setAuth(auth);
			setGoogleAuthProvider(googleAuthProvider);
			setFirestore(firestore);
			setStorage(storage);
		} catch (error) {
			toast.error(error.message);
		}
	}, []);

	return (
		<main>
			{user ? (
				username ? (
					<SignOutButton auth={auth} />
				) : (
					<UsernameForm />
				)
			) : (
				<SignInButton
					auth={auth}
					googleAuthProvider={googleAuthProvider}
				/>
			)}
		</main>
	);
};

export default HomePage;

export interface SignOutButtonProps {
	auth: firebase.auth.Auth;
}

export const SignOutButton = ({ auth }: SignOutButtonProps): ReactElement => {
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

export interface SignInButtonProps {
	auth: firebase.auth.Auth;
	googleAuthProvider: firebase.auth.GoogleAuthProvider;
}

export const SignInButton = ({
	auth,
	googleAuthProvider,
}: SignInButtonProps): ReactElement => {
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
	return <form></form>;
};
