import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/useAuth";
import { message } from "antd";
import AdminHome from "../Admin/AdminHome";
import UserMain from "../User/UserMain";

const MainHome = () => {
	const { apiurl, token } = useAuth();
	const [userDetails, setUserDetails] = useState(null);

	useEffect(() => {
		fetchUserDetails();
	}, []);

	const fetchUserDetails = async () => {
		try {
			const response = await fetch(`${apiurl}/get-user-details/`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const data = await response.json();
				setUserDetails(data.data);
			} else {
				const data = await response.json();
				message.error(data.error);
			}
		} catch (error) {
			message.error("Please Try Again");
		}
	};

	if (userDetails?.role === "user") {
		return <UserMain />;
	}

	if (userDetails?.role === "admin") {
		return <AdminHome />;
	}
};

export default MainHome;
