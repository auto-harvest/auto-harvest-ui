import { useAppDispatch, useAppSelector } from "@/store/overrides";
import { logout } from "@/store/slices/persist/authSlice";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";

export const useAuthGuard = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!token) {
      dispatch(logout());
      router.push("/login");
    }
  }, [token, router, dispatch]);

  return token;
};
