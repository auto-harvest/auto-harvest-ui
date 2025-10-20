export const environment = {
  production: process.env.NODE_ENV === "production",
  apiBaseUrl: process.env.EXPO_PUBLIC_API_URL!,
  wsBaseUrl: process.env.EXPO_PUBLIC_WS_URL!,
};
