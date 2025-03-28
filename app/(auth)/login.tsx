import React from 'react';
import { styles } from '../../styles/auth.style';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import { useRouter } from 'expo-router';
import { useSSO } from "@clerk/clerk-expo";

function login() {
    const { startSSOFlow } = useSSO()
    const router = useRouter();
    const handleGoogleSignIn = async () => {
        console.log("Google clicked");
        //router.replace("/(tabs)")
        try {
            const { createdSessionId, setActive } = await startSSOFlow({ strategy: "oauth_google" })
            if (setActive && createdSessionId) {
                setActive({ session: createdSessionId })
                router.replace("/(tabs)")
            }
        } catch (error) {
            console.log("Oauth Error:", error);
            //router.replace("/(tabs)")
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.brandSection}>
                <View style={styles.logoContainer}>
                    <Ionicons name="leaf" size={32} color={COLORS.primary} />
                </View>
                <Text style={styles.appName}>Instagram</Text>
                <Text style={styles.tagline}>Don't miss anything</Text>
            </View>
            <View style={styles.illustrationContainer}>
                <Image source={require("../../assets/images/social.png")} style={styles.illustration}
                    resizeMode="cover" />
            </View>

            <View style={styles.loginSection}>
                <TouchableOpacity style={styles.googleButton}
                    onPress={handleGoogleSignIn}
                    activeOpacity={0.9}>

                    <View style={styles.googleIconContainer}>
                        <Ionicons name="logo-google" size={20} color={COLORS.surface} />

                    </View>
                    <Text style={styles.googleButtonText}>
                        Continue with Google
                    </Text>
                </TouchableOpacity>
                <Text style={styles.termsText}>
                    By continuing, you agree to out Terms and Privacy Policy
                    </Text>
            </View>
        </View>
    );
}

export default login;