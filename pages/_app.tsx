import React from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';

const MyApp = ({ Component, pageProps }: AppProps) => {
	const userData = useUserData();

	return (
		<UserContext.Provider value={userData}>
			<Navbar />
			<Component {...pageProps} />
			<Toaster />
		</UserContext.Provider>
	);
};

export default MyApp;
