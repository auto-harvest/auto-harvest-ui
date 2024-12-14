import { persistor, store } from "@/store/store";
import { Redirect } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useRouter } from "expo-router";
const isLoggedIn: boolean = false;

const StartPage = () => {
  return <Redirect href="/test" />;
};
{
  /* {isLoggedIn ? (
          <Redirect href="/systemSelection" />
        ) : (
          <Redirect href="/login" />
        )} */
}

export default StartPage;
