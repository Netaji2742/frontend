import React from "react";
import Main from "../Layouts/Main";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import './../../App.css'
import Tests from "./Tests";
import Results from "./Results";

const UserMain = () => {
	return (
		<Main>
			<div className="user-main">
				<Tabs centered defaultActiveKey="1">
					
					<TabPane
						tab={
							<div className="tab-names">
								<div className="tab-name">Tests</div>
							</div>
						}
						key="1">
						<Tests />
					</TabPane>
					<TabPane
						tab={
							<div className="tab-names">
								<div className="tab-name">Results</div>
							</div>
						}
						key="2">
						<Results/>
					</TabPane>
				</Tabs>
			</div>
		</Main>
	);
};

export default UserMain;
