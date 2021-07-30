import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { auth, googleAuthProvider } from "../lib/firebase";

export interface HomePageProps {}

const HomePage = (props: HomePageProps) => {
	const user = null;
	const username = null;

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

export default HomePage;

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
	return <form></form>;
};
