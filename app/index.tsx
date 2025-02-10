import { Redirect } from "expo-router";
import { useAppSelector } from "@/store/overrides";

const StartPage = () => {
  
  const token = useAppSelector((state) => state.auth.token);
  return token ? (
    <Redirect href="/systemSelection" />
  ) : (
    <Redirect href="/login" />
  );
};

export default StartPage;
