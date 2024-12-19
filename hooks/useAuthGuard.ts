import { useAppSelector } from "@/store/overrides";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";

export const useAuthGuard = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  return token;
};
