import { useAppDispatch, useAppSelector } from "@/store/overrides";
import { logout } from "@/store/slices/persist/authSlice";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export const useAuthGuard = () => {
  const router = useRouter();
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!token) {
      dispatch(logout());
      router.navigate("/login");
    }
  }, [token, router, dispatch]);

  return token;
};
