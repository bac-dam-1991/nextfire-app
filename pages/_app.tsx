import React from "react";
import { AppProps } from "next/app";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Navbar />
			<Component {...pageProps} />
			<Toaster />
		</>
	);
};

export default MyApp;
