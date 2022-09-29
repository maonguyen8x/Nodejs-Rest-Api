import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Profile from "./pages/profile/Profile";

function App() {
	return (
		<Router>
			<Routes>
				<Route exac path="/" element={<Home/>}>
				</Route>
				<Route path="/login" element={<Login/>}>
				</Route>
				<Route path="/register" element={<Register/>}>
				</Route>
				<Route path="/profile/:username" element={<Profile/>}>
				</Route>
			</Routes>
		</Router>
	);
}

export default App;