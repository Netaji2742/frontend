import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import Loader from "../Loader/Loader";

const Login = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const { apiurl, handleLogin } = useAuth();

	const handleAuthentication = async () => {
		try {
			const values = await form.validateFields();
			setLoading(true);

			const response = await fetch(`${apiurl}/login/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			const data = await response.json();
			if (response.ok){
				handleLogin(data.access_token);
				message.success("login  successful");
				setLoading(false);				
				navigate("/");
			}
			else{
				message.error(data.error);
				setLoading(false);
			}
		} catch (error) {
			setLoading(false);
			message.error(error.toString());
		}
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<div className="login-form">
				<Form
					form={form}
					className="form-cont"
					layout="vertical"
					initialValues={{
						remember: true,
					}}
					onFinish={handleAuthentication}
					autoComplete="off">
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{
								required: true,
								message: "Please input your username!",
							},
						]}>
						<Input className="inp" />
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						rules={[
							{
								required: true,
								message: "Please input your password!",
							},
						]}>
						<Input.Password
							className="inp"
						/>
					</Form.Item>

					<div className="forgotpass">
						<Link to="/forgot-password">Forgot Password</Link>
					</div>
					<br />
					<br />
					<Form.Item className="btn">
						<Button type="primary" htmlType="submit">
							Log In
						</Button>
					</Form.Item>
				</Form>
			</div>
		</>
	);
};

export default Login;
