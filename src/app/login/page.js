"use client";

import React from "react";
import styled, { keyframes } from "styled-components";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/firebase.config";
import { useState } from "react";

// Styled Components
const MainContainer = styled.div`
  background: linear-gradient(to bottom, #e0f7f3, #f0f8f7);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const Logo = styled.img`
  position: absolute;
  top: 5px;
  left: 10px;
  width: 100px;
  height: auto;
`;

const Container = styled.div`
  background-color: #f0f8f7;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: absolute;
  top: 18%;
  left: 20%;
  overflow: hidden;
  width: 60vw;
  max-width: 100%;
  min-height: 400px;
`;

const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${(props) =>
    !props.signingIn
      ? `
      transform: translateX(100%);
      opacity: 1;
      z-index: 5;
    `
      : null}
`;

const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) => (!props.signingIn ? "transform: translateX(100%);" : null)}
`;

const Form = styled.form`
  background-color: #f0f8f7;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  height: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-weight: bold;
  margin: 0;
  color: #2b6777;
`;

const PanelTitle = styled.h1`
  font-weight: bold;
  margin: 0;
  color: #f0f8f7;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 8px 0;
`;

const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  width: 100%;
`;

const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #2b6777;
  background-color: #2b6777;
  color: #f0f8f7;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;

const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
`;

const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${(props) => (!props.signingIn ? "transform: translateX(-100%);" : null)}
`;

const Overlay = styled.div`
  background: #2b6777;
  background-repeat: no-repeat;
  background-size: cover;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${(props) => (!props.signingIn ? "transform: translateX(50%);" : null)}
`;

const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${(props) => (!props.signingIn ? "transform: translateX(0);" : null)}
`;

const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${(props) => (!props.signingIn ? "transform: translateX(20%);" : null)}
`;

const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

const Snackbar = styled.div`
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  min-width: 250px;
  margin-left: -125px;
  background-color: ${(props) =>
    props.severity === "success" ? "#2b6777" : "#f44336"};
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 30px;
  font-size: 17px;
`;

const Loader = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
`;

const Dot = styled.div`
  background-color: #2b6777;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 3px;
  display: inline-block;
  animation: ${Loader} 0.6s infinite ease-in-out both;
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PasswordToggle = styled.span`
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #888;
`;

const login = () => {
  const [signIn, toggle] = React.useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSnackbarMessage("Login successful");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => {
        window.location.href = "/Home";
      }, 1500);
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Invalid email or password");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setSnackbarMessage("Please enter a valid email address.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (password !== confirmPassword) {
      setSnackbarMessage("Passwords do not match.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      sessionStorage.setItem("user", JSON.stringify({ userId: res.user.uid }));
      setSnackbarMessage("Signup successful!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => {
        window.location.href = "/signup";
      }, 1500);
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Signup failed. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainContainer>
      <Logo src="/Logo15.png" alt="Logo" />
      <Container>
        <SignUpContainer signingIn={signIn}>
          <Form onSubmit={handleSignup}>
            <Title>Create Account</Title>
            <InputContainer>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <Input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <PasswordToggle
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? "👁️" : "🙈"}
              </PasswordToggle>
            </InputContainer>
            <InputContainer>
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </InputContainer>
            <Button disabled={loading}>Sign Up</Button>
          </Form>
        </SignUpContainer>
        <SignInContainer signingIn={signIn}>
          <Form onSubmit={handleLogin}>
            <Title>Sign In</Title>
            <InputContainer>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <Input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <PasswordToggle
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? "👁️" : "🙈"}
              </PasswordToggle>
            </InputContainer>
            <Anchor href="#">Forgot your password?</Anchor>
            <Button disabled={loading}>Sign In</Button>
          </Form>
        </SignInContainer>
        <OverlayContainer signingIn={signIn}>
          <Overlay signingIn={signIn}>
            <LeftOverlayPanel signingIn={signIn}>
              <PanelTitle>Welcome Back!</PanelTitle>
              <Paragraph>
                To keep connected with us please login with your personal info
              </Paragraph>
              <GhostButton onClick={() => toggle(true)}>Sign In</GhostButton>
            </LeftOverlayPanel>
            <RightOverlayPanel signingIn={signIn}>
              <PanelTitle>Hello, Friend!</PanelTitle>
              <Paragraph>
                Enter your personal details and start journey with us
              </Paragraph>
              <GhostButton onClick={() => toggle(false)}>Sign Up</GhostButton>
            </RightOverlayPanel>
          </Overlay>
        </OverlayContainer>
      </Container>
      {loading && (
        <Dots>
          <Dot />
          <Dot />
          <Dot />
        </Dots>
      )}
      <Snackbar open={snackbarOpen} severity={snackbarSeverity}>
        {snackbarMessage}
      </Snackbar>
    </MainContainer>
  );
};

export default login;