import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { keyframes } from "styled-components";

function SignUp() {
  const [name, setName] = useState();
  const [loader, setLoader] = useState(false);
  const [messageStatus, setMessageStatus] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [emailStatus, setEmailStatus] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    status: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setEmailStatus(false);
    setPasswordStatus(false);
    setValidEmail(false);
    setMessageStatus(false);
  };

  function signupHandler(event) {
    event.preventDefault();
    setLoader(true);
    fetch("https://usertestapp-api.onrender.com/signup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!"
          );
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Creating a user failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        if (resData.message === "User created!") {
          setMessageStatus(true);
          setEmailStatus(false);
          setPasswordStatus(false);
        }
        if (resData.data[0].msg === "E-Mail address already exists!") {
          console.log(resData.data[0].msg);
          setEmailStatus(true);
        } else if (resData.data[0].msg === "Please enter a valid email.") {
          setValidEmail(true);
        } else if (
          resData.data[0].msg === "Password must be at least 5 characters long."
        ) {
          setPasswordStatus(true);
        }
      })
      .catch((err) => {
        console.log(err);
      setLoader(false);
      });
  }

  return (
    <SignUpContainer>
      <FormHeader>Sign Up</FormHeader>
      <Form>
        <InputContainer>
          <InputLabel htmlFor="name">Name</InputLabel>
          <UserInput
            id="name"
            type="text"
            value={name}
            name="name"
            onChange={handleInputChange}
          />
        </InputContainer>

        <InputContainer>
          <InputLabel htmlFor="password">Password</InputLabel>

          <UserInput
            id="password"
            type="password"
            value={password}
            name="password"
            onChange={handleInputChange}
          />
        </InputContainer>

        <InputContainer>
          <InputLabel htmlFor="email">Email</InputLabel>
          <UserInput
            id="email"
            type="email"
            value={email}
            name="email"
            onChange={handleInputChange}
          />
        </InputContainer>
      </Form>
      <SignUpBtn type="button" onClick={signupHandler}>
        SIGN UP
      </SignUpBtn>
{loader && (
  <SpinnerContainer>
      <SpinnerDiv/>
    </SpinnerContainer>)}
      <LoginBtn onClick={() => navigate("/")}>Login</LoginBtn>

      {messageStatus && (
        <MsgContainer>
          <RegMsg>Registration Successful!</RegMsg>
        </MsgContainer>
      )}
      {emailStatus && (
        <MsgContainer>
          <EmailMsg>E-Mail address already exists!</EmailMsg>
        </MsgContainer>
      )}
      {validEmail && (
        <MsgContainer>
          <EmailMsg>Please enter valid email</EmailMsg>
        </MsgContainer>
      )}
      {passwordStatus && (
        <MsgContainer>
          <EmailMsg>Password must be at least 5 characters long.</EmailMsg>
        </MsgContainer>
      )}
    </SignUpContainer>
  );
}

export default SignUp;

const SignUpContainer = styled.div`
  width: 100%;
  margin: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FormHeader = styled.h1`
  font-size: 28px;

  font-family: "Open Sans", sans-serif;
  margin-bottom: 20px;
  text-transform: uppercase;
  align-text: center;
`;
const InputLabel = styled.label`
  font-size: 16px;
  font-family: "Open Sans", sans-serif;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 15px;
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
const SignUpBtn = styled.button`
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
const RegMsg = styled.p`
  font-size: 14px;
  color: green;
  font-family: "Open Sans", sans-serif;
`;
const MsgContainer = styled.div`
  display: flex;
  width: 600px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
`;

const EmailMsg = styled.p`
  font-size: 14px;
  color: red;
  font-family: "Open Sans", sans-serif;
`;

const LoginBtn = styled.button`
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

