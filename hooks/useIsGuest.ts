import { useAppSelector } from "@/store/overrides";

export const useIsGuest = (): boolean => {
  const email = useAppSelector((state) => state.auth.user?.email);
  return !!email && email.startsWith("guest@");
};
