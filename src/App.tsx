import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";

// toastify
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Register />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</Router>
			<ToastContainer
				position="top-right"
				autoClose={4000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable={false}
				pauseOnHover
				theme="light"
				transition={Slide}
			/>
		</div>
	);
}

export default App;
