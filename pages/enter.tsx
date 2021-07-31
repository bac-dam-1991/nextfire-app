import React, { ReactElement } from 'react';
import { useUserContext } from '../lib/context';
import { SignInButton } from '../lib/SignInButton';
import { SignOutButton } from '../lib/SignOutButton';
import { UsernameForm } from '../lib/UsernameForm';

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
