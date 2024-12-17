import { RootState } from "@/store/store";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuthGuard = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  return token;
};
