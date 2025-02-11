/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from "@/constants/Colors";
import { useAppSelector } from "@/store/overrides";

export function useThemeColor() {
  const theme = useAppSelector((state) => state.auth.theme);

  if (theme === "light") {
    return { theme: Colors.light };
  }
  return { theme: Colors.dark };
}

export function useDarkTheme(): boolean {
  const theme = useAppSelector((state) => state.auth.theme);
  return theme === "dark";
}