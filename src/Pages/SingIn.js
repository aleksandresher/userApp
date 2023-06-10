import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { keyframes } from "styled-components";

function SingIn({ LoginHandler }) {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });
  const [loader, setLoader] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emailStatus, setEmailStatus] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [statusStatus, setStatusStatus] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setEmailStatus(false);
    setStatusStatus(false);
  };

  function loginHandler(event) {
    event.preventDefault();
    setLoader(true);
    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Could not authenticate you!");
        }
        return res.json();
      })
      .then((resData) => {
        setAuthLoading(false);
      setLoader(false);
        setIsAuth(true);
        setToken(resData.token);
        setUserId(resData.userId);
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
       
        localStorage.setItem("status", true);
        if (resData.message === "A user with this email could not be found.") {
          setEmailStatus(true);
        } else if (resData.message === "Wrong password!") {
          setPasswordStatus(true);
        } else if (resData.message === "Your account is currently inactive.") {
          setStatusStatus(true);
        }

        if (resData.message === "welcome") {
          navigate("/users");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsAuth(false);
        setAuthLoading(false);
        setError(err);
       setLoader(false);
      });
  }

  return (
    <SignInContainer>
      <SignInHeader>Sign In</SignInHeader>
      <Form>
        <InputContainer>
          <InputLabel htmlFor="emailValue">Email</InputLabel>
          <UserInput
            id="emailValue"
            type="email"
            value={email}
            name="email"
            onChange={handleInputChange}
          />
        </InputContainer>

        <InputContainer>
          <InputLabel htmlFor="passwordValue">Password</InputLabel>
          <UserInput
            id="passwordValue"
            type="password"
            value={password}
            name="password"
            onChange={handleInputChange}
          />
        </InputContainer>

      </Form>
      <SignInBtn onClick={loginHandler}>SIGN IN</SignInBtn>
{loader?<SpinnerContainer>
      <SpinnerDiv/>
    </SpinnerContainer>: ""}
      <CreateAccountBtn onClick={() => navigate("/signup")}>
        Create new account
      </CreateAccountBtn>
      {passwordStatus && (
        <MsgContainer>
          <RegMsg>Wrong password</RegMsg>
        </MsgContainer>
      )}
      {emailStatus && (
        <MsgContainer>
          <RegMsg>A user with this email could not be found.</RegMsg>
        </MsgContainer>
      )}
      {statusStatus && (
        <MsgContainer>
          <RegMsg>User is Blocked</RegMsg>
        </MsgContainer>
      )}
    </SignInContainer>
  );
}

export default SingIn;

const SignInContainer = styled.div`
  width: 100%;
  margin: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 15px;
`;

const SignInHeader = styled.h1`
  font-size: 28px;
  font-family: "Open Sans", sans-serif;
  margin-bottom: 20px;
  text-transform: uppercase;
`;
const UserInput = styled.input`
  height: 40px;
  widht: 300px;
  font-size: 14px;
  font-family: "Open Sans", sans-serif;
  border-radius: 4px;
  outline: none;
  border: 1px solid #c0c5c1;
  padding: 10px 10px;

  &:focus {
    border: 1px solid #d8ccbd;
    outline: none;
  }
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const InputLabel = styled.label`
  font-size: 16px;
  font-family: "Open Sans", sans-serif;
`;
const SignInBtn = styled.button`
  width: 300px;
  height: 40px;
  margin-top: 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  color: #fff;
  transition: 0.5s;

  box-shadow: 0 0 20px #eee;
  background-image: linear-gradient(
    to right,
    #d31027 0%,
    #ea384d 51%,
    #d31027 100%
  );
`;
const MsgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
`;
const RegMsg = styled.p`
  font-size: 14px;
  color: red;
  font-family: "Open Sans", sans-serif;
`;
const CreateAccountBtn = styled.button`
  width: 200px;
  height: 30px;
  background-color: green;
  color: #fff;
  font-family: "Open Sans", sans-serif;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  border: none;
  align-self: center;
  margin-top: 20px;
`;

const rotate = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;

const SpinnerDiv = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #1cb041; /* Blue */
  border-radius: 50%;
  animation: ${rotate} 1.5s linear infinite;
`;

const SpinnerContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  height: 350px;
  position: absolute;
`;


