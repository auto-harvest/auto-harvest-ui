/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const background = "#F5F5F5";
const text = "#000000";
const primaryGreen = "#4CAF50";
const secondary = "#FFA726";
const card = "#FFFFFF";
const border = "#32f1";

// Suggested new colors
const tertiary = "#2196F3";   // A strong blue
const quaternary = "#9C27B0"; // A deep purple
const quinary = "#009688";    // A bright yellow
const red="#D32F2F";

const darkBackground = "#121212";
const darkText = "#FFFFFF";
const darkPrimary = "#81C784";
const darkSecondary = "#FFB74D";
const darkCard = "#1E1E1E";
const darkBorder = "#333333";

// Suggested new colors
const darkTertiary = "#64B5F6";    // Lighter blue for dark background
const darkQuaternary = "#BA68C8";  // Lighter purple for dark background
const darkQuinary = "#4DB6AC";     // Lighter yellow/orange for dark background

export const Colors = {
  light: {
    text: text,
    background: background,
    primary: primaryGreen,
    card: card,
    border: border,
    secondary: secondary,
    tertiary: tertiary,
    quaternary: quaternary,
    quinary: quinary,
    red:red
  },
  dark: {
    text: darkText,
    background: darkBackground,
    primary: darkPrimary,
    card: darkCard,
    border: darkBorder,
    secondary: darkSecondary,
    tertiary: darkTertiary,
    quaternary: darkQuaternary,
    quinary: darkQuinary,
    red:red
  },
};
