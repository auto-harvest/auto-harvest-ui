import { Redirect } from "expo-router";

import { useAppSelector } from "@/store/overrides";
const isLoggedIn: boolean = false;

const StartPage = () => {
  return <Redirect href="/notification" />;
  const token = useAppSelector((state) => state.auth.token);
  // return null;
  return token ? (
    <Redirect href="/systemSelection" />
  ) : (
    <Redirect href="/login" />
  );
};

export default StartPage;
