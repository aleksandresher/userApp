import { Routes, Route, useNavigate, sw } from "react-router-dom";
import UsersPage from "./Pages/Users";
import { useState } from "react";
import SignUp from "./Pages/SignUp";
import SingIn from "./Pages/SingIn";

function App() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(localStorage.getItem("status"));
  const [userId, setUserId] = useState();
  const [token, setToken] = useState();
  console.log(`UserId: ${userId}, token: ${token}`);
  console.log(isAuth);

  function LoginHandler(id, token) {
    setUserId(id);
    setToken(token);
    setIsAuth(true);
    isAuth ? navigate("https://usertestapp-api.onrender.com/users") : navigate("https://usertestapp-api.onrender.com/auth/signup");
  }

  function toggleStatus() {
    setIsAuth((prev) => !prev);
  }

  return (
    <div>
      <Routes>
        <Route path="https://usertestapp-api.onrender.com/" element={<SingIn LoginHandler={LoginHandler} />} />
        <Route path="https://usertestapp-api.onrender.com/signup" element={<SignUp />} />
        {isAuth ? (
          <Route
            path="https://usertestapp-api.onrender.com/users"
            element={<UsersPage toggleStatus={toggleStatus} />}
          />
        ) : (
          ""
        )}
      </Routes>
    </div>
  );
}
export default App;
