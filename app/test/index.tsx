import React, { useState } from "react";
import { setToken, setUser } from "../../store/slices/persist/authSlice";
import { TextInput } from "react-native-paper";
import { Button, View } from "react-native";
import { useRouter } from "expo-router";
import { useAppDispatch } from "@/store/overrides";

const LoginScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = async () => {
    // Simulate API call

   // const response = await fakeLoginApi(email, password);
    //const { token, user } = response;
//console.log(": LoginScreen -> user", user);
   // // Dispatch token and user information
//dispatch(setToken(token));
   // dispatch(setUser(user as any));
   // router.push("/dashboard");
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;

// Mock API function
// export const fakeLoginApi = async (
//   email: string,
//   password: string
// ): Promise<{
//   token: string;
//   user: { id: string; name: string; email: string };
// }> => {
//   return new Promise((resolve) =>
//     setTimeout(() => {
//       resolve({
//         token:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxODE2MjM5MDIyfQ.8FDcphMEeZ5j0U-g865C2Bw1e6Z04eksyRg9YVRuKP4",
//         user: { id: "1", name: "John Doe", email },
//       });
//     }, 100)
//   );
// };
