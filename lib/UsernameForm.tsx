import React, {
	ChangeEvent,
	FormEvent,
	ReactElement,
	useState,
	useCallback,
	useEffect,
} from 'react';
import { useUserContext } from './context';
import { firestore } from './firebase';
import { UsernameMessage } from './UsernameMessage';
import debounce from 'lodash.debounce';

export interface UsernameFormProps {}

export const UsernameForm = (props: UsernameFormProps): ReactElement => {
	const [formValue, setFormValue] = useState<string>('');
	const [isValid, setIsValid] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const { user, username } = useUserContext();

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Create refs for both documents
		const userDoc = firestore.doc(`users/${user.uid}`);
		const usernameDoc = firestore.doc(`usernames/${formValue}`);

		// Commit both docs together as a batch write.
		const batch = firestore.batch();
		batch.set(userDoc, {
			username: formValue,
			photoURL: user.photoURL,
			displayName: user.displayName,
		});
		batch.set(usernameDoc, { uid: user.uid });

		await batch.commit();
	};

	const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
		const val = event.target.value.trim().toLowerCase();
		const pattern = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

		// Only set form value if length is < 3 OR it passes regex
		if (val.length < 3) {
			setLoading(false);
			setIsValid(false);
		}
		if (pattern.test(val)) {
			setLoading(true);
			setIsValid(false);
		}
		setFormValue(val);
	};

	const checkUsernameAsync = useCallback(
		debounce(async () => {
			try {
				if (formValue.length < 3) {
					return;
				}
				const ref = firestore.doc(`usernames/${formValue}`);
				const { exists } = await ref.get();
				setIsValid(!exists);
				setLoading(false);
			} catch (error) {
				setIsValid(false);
				setLoading(false);
			}
		}, 500),
		[formValue]
	);

	useEffect(() => {
		checkUsernameAsync();
	}, [checkUsernameAsync]);

	return (
		!username && (
			<section>
				<h3>Choose Username</h3>
				<form onSubmit={handleSubmit}>
					<input
						onChange={handleUsernameChange}
						placeholder="myname"
						name="username"
						value={formValue}
					/>
					<UsernameMessage
						loading={loading}
						isValid={isValid}
						username={formValue}
					/>
					<button type="submit" className="btn-green" disabled={!isValid}>
						Choose
					</button>
					<h3>Debug State</h3>
					<div>
						Username: {formValue}
						<br />
						Loading: {loading.toString()}
						<br />
						Username Valid: {isValid.toString()}
					</div>
				</form>
			</section>
		)
	);
};
