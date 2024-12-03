import { Redirect } from "expo-router";

const isLoggedIn: boolean = false;

const StartPage = () => {
  if (isLoggedIn) {
    return <Redirect href="/systemSelection" />;
  } else {
    return <Redirect href="/login" />;
  }
};

export default StartPage;
