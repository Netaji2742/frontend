import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { List, Typography, Spin } from "antd";
import { useAuth } from "../utils/useAuth";

const { Title } = Typography;

const Results = () => {
	const [tests, setTests] = useState([]);
	const [loading, setLoading] = useState(false);
	const { apiurl, token } = useAuth();

	useEffect(() => {
		const fetchTests = async () => {
			setLoading(true);
			try {
				const response = await fetch(`${apiurl}/result/`, {
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
			<Title level={2}>List of Results</Title>
			<List
				dataSource={tests}
				renderItem={(test) => (
					<List.Item>
						<>
							<div>
								<Title level={4}>{test.test}</Title>
									<pre >{test.result}</pre>
							</div>
						</>
					</List.Item>
				)}
			/>
		</div>
	);
};

export default Results;
