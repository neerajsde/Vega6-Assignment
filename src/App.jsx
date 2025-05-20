import { Routes, Route } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup"
import Dashboard from "./pages/private/Dashboard";
import { useSelector } from "react-redux";
import Loader from "./components/spinner/Loader";
import PrivateRoute from "./pages/private/PrivateRoute";

function App() {
  const {loading} = useSelector((state) => state.user);

  if(loading){
    return (
      <div className='w-screen h-screen flex justify-center items-center'><Loader/></div>
    )
  }

  return (
    <div className="w-full flex flex-col">
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="*" element={<h1 className="text-center text-3xl font-bold">404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
