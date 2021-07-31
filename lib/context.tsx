import React, { createContext, useContext } from 'react';
import firebase from 'firebase';

export interface IUserContext {
	username: string | null;
	user: firebase.User | null;
}

export const UserContext = createContext<IUserContext>({
	username: null,
	user: null,
});

export const useUserContext = () => {
	return useContext(UserContext);
};
