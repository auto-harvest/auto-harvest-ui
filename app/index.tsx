import { Redirect } from "expo-router";
import React from "react";
const isLoggedIn: boolean = false;

const StartPage = () => {
  // return <Redirect href="/test" />;

  if (isLoggedIn) {
    return <Redirect href="/systemSelection" />;
  }
  return <Redirect href="/login" />;
};

export default StartPage;
