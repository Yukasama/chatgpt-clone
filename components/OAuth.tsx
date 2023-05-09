"use client";

import { Button } from "@mui/material";
import { Google } from "@mui/icons-material";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();
const provider = new GoogleAuthProvider();

const GoogleAuthButton = () => {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google Auth failed", error);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<Google />}
      onClick={handleLogin}>
      Continue with Google
    </Button>
  );
};

export default GoogleAuthButton;
