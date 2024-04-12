import React, { createContext, useEffect, useState } from "react";
import Loader from "../Loader/Loader";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [token, setToken] = useState(null);

	const apiurl = process.env.REACT_APP_API_URL;

	useEffect(() => {
		const storedToken = localStorage.getItem("parsonproblemtk");
		if (storedToken) {
			setToken(storedToken);
		} else {
			const sessionToken = sessionStorage.getItem("parsonproblemtk");
			if (sessionToken) {
				setToken(sessionToken);
			}
		}
		setIsLoading(false);
	}, []);

	const handleLogin = (token) => {
		setToken(token);
		localStorage.setItem("parsonproblemtk", token);
	};

	const handleSessionLogin = (token) => {
		setToken(token);
		sessionStorage.setItem("parsonproblemtk", token);
	};

	const handleLogout = () => {
		setToken(null);
		localStorage.removeItem("parsonproblemtk");
		sessionStorage.removeItem("parsonproblemtk");
	};

	if (isLoading) {
		return <Loader></Loader>;
	}

	return (
		<UserContext.Provider
			value={{
				handleLogin,
				handleSessionLogin,
				handleLogout,
				token,
				apiurl,
			}}>
			{children}
		</UserContext.Provider>
	);
};