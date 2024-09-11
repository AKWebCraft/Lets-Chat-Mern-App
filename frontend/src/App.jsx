import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import { Toaster } from "react-hot-toast";
import useAutoLogin from "./hooks/useAutoLogin";
import { useSelector } from "react-redux";

function App() {
  const loading = useAutoLogin();
  const { auth } = useSelector((state) => state.user);
  return loading ? (
    <div className="loading loading-spinner"></div>
  ) : (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={auth ? <Home /> : <LogIn />} />
            <Route path="/login" exact element={auth ? <Home /> : <LogIn />} />
            <Route
              path="/signup"
              exact
              element={auth ? <Home /> : <SignUp />}
            />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </div>
    </>
  );
}

export default App;
