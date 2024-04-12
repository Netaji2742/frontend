import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthRoute } from "./Components/utils/AuthRoute";
import Main from "./Components/userauth/main";
import ChangePasswordForm from "./Components/Password/Change";
import ForgotPassword from "./Components/Password/Forgot";
import ResetPasswordForm from "./Components/Password/Reset";
import MainHome from "./Components/Home/Main";
import Solve from "./Components/User/Solve";


function App() {
	return (
		<>
			<Routes>
				<Route path="/auth" element={<Main />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/reset-password" element={<ResetPasswordForm />} />
				<Route path="/" element={<AuthRoute />}>
					<Route path="/" element={<MainHome />} />
					<Route path="/change-password" element={<ChangePasswordForm />} />
					<Route path="/test/:id" element={<Solve />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
