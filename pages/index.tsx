import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export interface HomePageProps {}

const HomePage = (props: HomePageProps) => {
	return (
		<main>
			<h1>Home</h1>
			<Link
				href={{
					pathname: "/[username]",
					query: { username: "bacd123" },
				}}
			>
				Bac&apos;s profile
			</Link>
		</main>
	);
};

export default HomePage;
