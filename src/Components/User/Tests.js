import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { List, Typography, Spin } from "antd";
import { useAuth } from "../utils/useAuth";

const { Title } = Typography;

const Tests = () => {
	const [tests, setTests] = useState([]);
	const [loading, setLoading] = useState(false);
    const {apiurl,token} = useAuth();

	useEffect(() => {
		const fetchTests = async () => {
			setLoading(true);
			try {
				const response = await fetch(`${apiurl}/test/`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`, 
					},
				});
				const responseData = await response.json();
				if (response.ok) {
					setTests(responseData.data);
				} else {
					console.error("Failed to fetch tests:", responseData);
				}
			} catch (error) {
				console.error("Error fetching tests:", error);
			}
			setLoading(false);
		};

		fetchTests();
	}, []);

	if (loading) {
		return <Spin size="large" />;
	}

	return (
		<div className="test-list-container">
			<Title level={2}>List of Tests</Title>
			<List
				dataSource={tests}
				renderItem={(test) => (
					<List.Item>
						<Link to={`/test/${test.id}`}>
							<div>
								<Title level={4}>{test.name}</Title>
								<p>Created By: {test.created_by}</p>
								<p>Level: {test.level}</p>
							</div>
						</Link>
					</List.Item>
				)}
			/>
		</div>
	);
};

export default Tests;
