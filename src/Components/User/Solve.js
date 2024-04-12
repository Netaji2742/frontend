import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography, Spin, Divider, Button } from "antd";
import SolveEasy from "./SolveEasy";
import SolveHard from "./SolveHard";
import SolveMedium from "./SolveMedium";
import { useAuth } from "../utils/useAuth";
import Main from "../Layouts/Main";

const { Title, Text } = Typography;

const Solve = () => {
	const [testData, setTestData] = useState(null);
	const [loading, setLoading] = useState(false);
	const { id } = useParams();
	const { apiurl, token } = useAuth();

	useEffect(() => {
		const fetchTest = async () => {
			setLoading(true);
			try {
				const response = await fetch(`${apiurl}/test/`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ id: id }),
				});
				const responseData = await response.json();
				if (response.ok) {
					setTestData(responseData.data);
				} else {
					console.error("Failed to fetch test:", responseData);
				}
			} catch (error) {
				console.error("Error fetching test:", error);
			}
			setLoading(false);
		};

		fetchTest();
	}, [id]);

	if (loading) {
		return <Spin size="large" />;
	}

	if (!testData) {
		return <div>No data found for the provided ID</div>;
	}

	const { level, shuffled_blocks } = testData;
	

	return (
		<Main>
			<div className="test-container">
				<Card title={testData.name} className="test-card">
					<Title level={4}>{testData.description}</Title>
					<Divider />
					<Text strong>Instructions:</Text>
					<p>{testData.instructions}</p>
					<Divider />
					{level === "EASY" && <SolveEasy id={id} blocks={shuffled_blocks} />}
					{level === "MEDIUM" && <SolveMedium id={id} blocks={shuffled_blocks} />}
					{level === "HARD" && <SolveHard id={id} blocks={shuffled_blocks} />}
				</Card>
			</div>
		</Main>
	);
};

export default Solve;
