import { Routes, Route, useNavigate, sw } from "react-router-dom";
import UsersPage from "./Pages/Users";
import { useState } from "react";
import SignUp from "./Pages/SignUp";
import SingIn from "./Pages/SingIn";

function App() {
  const navigate = useNavigate();
//   const [isAuth, setIsAuth] = useState(localStorage.getItem("status"));
//   const [userId, setUserId] = useState();
//   const [token, setToken] = useState();
//   console.log(`UserId: ${userId}, token: ${token}`);
//   console.log(isAuth);

//   function LoginHandler(id, token) {
//     setUserId(id);
//     setToken(token);
//     setIsAuth(true);
//     isAuth ? navigate("/users") : navigate("/auth/signup");
//   }

  function toggleStatus() {
    setIsAuth((prev) => !prev);
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<SingIn LoginHandler={LoginHandler} />} />
        <Route path="/signup" element={<SignUp />} />
        {isAuth ? (
          <Route
            path="/users"
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
