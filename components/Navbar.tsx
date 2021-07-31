/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/link-passhref */
import React, { ReactElement } from 'react';
import Link from 'next/link';
import { useUserContext } from '../lib/context';

export interface NavbarProps {}

const Navbar = (props: NavbarProps): ReactElement => {
	const { username, user } = useUserContext();

	return (
		<nav className="navbar">
			<ul>
				<li>
					<Link href="/">
						<button className="btn-logo">FEED</button>
					</Link>
				</li>
				{username && user && (
					<>
						<li className="push-left">
							<Link href="/admin">
								<button className="btn-blue">Write Posts</button>
							</Link>
						</li>
						<li>
							<Link href={`/${username}`}>
								<img src={user.photoURL} alt={username} />
							</Link>
						</li>
					</>
				)}
				{!username && !user && (
					<li>
						<Link href="/enter">
							<button className="btn-blue">Log in</button>
						</Link>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
