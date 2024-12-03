import {Stack} from "expo-router";

export default function LoginLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false, // Hides the header for all screens in this layout
            }}
        />
    );
}
