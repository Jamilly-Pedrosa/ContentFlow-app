import {View, Text, Pressable} from "react-native";
import { NotePencilIcon,LightbulbIcon, X, XIcon } from "phosphor-react-native";
import {colors} from "../../theme/Colors";
import {StyleSheet} from "react-native";
import {useState} from "react";

type CreateDrawerProps = {
    visible: boolean;
    close: () => void;
}

export default function CreateDrawer({ visible,close }: CreateDrawerProps) {

  
    return (
        <View className={visible ? 'flex bg-white w-full rounded-t-3xl p-4 h-35 border-24' : 'hidden'}>
            <View className="flex-row gap-6 items-center mb-4">
                <Pressable onPress={close}>
                    <View style={styles.containerX}>
                        <XIcon/>
                    </View>
                </Pressable>
                <View>
                    <Text className="text-large-text color-text-gray-800">
                        O que você deseja criar?
                    </Text>
                </View>
            </View>
        
            <View style={styles.conteinerButtons}>
                
                <View className="items-center">
                    <Pressable className="items-center">
                        <View style={styles.containerIcon}>
                            <NotePencilIcon/>
                        </View>
                        <Text className="text-body-text color-text-gray-800">
                            Post
                        </Text>
                    </Pressable>
                </View>

                <Pressable className="items-center">
                    <View style={styles.containerIcon}>
                        <LightbulbIcon/>
                    </View>
                    <Text className="text-body-text color-text-gray-800">
                        Idea
                    </Text>
                </Pressable>
            
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerIcon: {
        backgroundColor: colors.primary[50],
        width: 70,
        height: 70,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerX: {
        width: 30,
        height: 30,
        //borderRadius: 24,
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    conteinerButtons: {
        flexDirection: 'row',
        gap: 20,
        justifyContent: "center",
    }
}); 