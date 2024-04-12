import React, { useState } from "react";
import Login from "./login";
import Signup from "./signup";
import { Button, Card} from "antd";
import "./auth.css";
import animationData from "./../../utils/loginanimation.json";
import Lottie from "react-lottie";

const Main = () => {
	const [activeTab, setActiveTab] = useState("login");

	const handleTabChange = (tab) => {
		setActiveTab(tab);
	};

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
	};

	return (
		<div className="login-main">
			<div className="section-2">
				<div className="left-section">
					<Lottie
						isClickToPauseDisabled={true}
						className="login-animation"
						options={defaultOptions}
					/>
				</div>
				<Card className="right-section">
					<div className="tabs-buttons">
						<Button
							onClick={() => handleTabChange("login")}
							className={activeTab === "login" ? "active-tab" : ""}>
							Login
						</Button>
						<Button
							onClick={() => handleTabChange("signup")}
							className={activeTab === "signup" ? "active-tab" : ""}>
							Signup
						</Button>
					</div>
					<div>
						{activeTab === "login" && <Login />}
						{activeTab === "signup" && <Signup />}
					</div>
				</Card>
			</div>
		</div>
	);
};

export default Main;
