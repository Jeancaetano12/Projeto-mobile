import React from "react";
import { View, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { DrawerHeaderProps } from "@react-navigation/drawer";

export function Header({ navigation }: DrawerHeaderProps) {
    const { user, signOut } = useAuth();

    return (
        <SafeAreaView edges={['top']} className="bg-purple-800">
            <View className="
            w-full flex-row items-center justify-between
            px-6 pt-4 pb-5"
            >
                {/*Icone de perfil*/ }
                <TouchableOpacity
                    className="p-2" activeOpacity={0.7}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <Feather name="user" size={28} color="white" />
                </TouchableOpacity>
                {/*Nome do usuario*/}
                <Text className="text-lg text-white semibold ml-3 ">
                    Olá {user.nomeCompleto}!
                </Text>
                {/*Icone de configurações*/ }
                <TouchableOpacity
                    className="p-2 ml-20" activeOpacity={0.7}
                    onPress={() => navigation.openDrawer()}
                >
                    <Feather name="menu" size={28} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}