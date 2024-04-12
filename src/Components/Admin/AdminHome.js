import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/useAuth";
import { Button, Form, Input, Modal, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Loader from "../Loader/Loader";
import "./../Home/Home.css";
import Main from "../Layouts/Main";
import Generate from "./Generate";

const AdminHome = () => {
	return (
		<Main>
			<Generate />
		</Main>
	);
};

export default AdminHome;