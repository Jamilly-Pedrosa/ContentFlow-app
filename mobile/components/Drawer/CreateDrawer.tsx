import {View, Text, Pressable} from "react-native";
import { NotePencilIcon,LightbulbIcon } from "phosphor-react-native";
import {colors} from "../../theme/Colors";
import {StyleSheet} from "react-native";
import {useState} from "react";

type CreateDrawerProps = {
    visible: boolean;
    close: () => void;
}

export default function CreateDrawer({ visible,close }: CreateDrawerProps) {

  
    return (
        <View className={visible ? 'flex bg-white w-full rounded-t-3xl p-4 h-35' : 'hidden'}>
            <View className="flex-row gap-6 items-center mb-4">
                <Pressable onPress={close}>
                    <Text>x</Text>
                </Pressable>
                <Text>O que você deseja criar?</Text>
            </View>
        
            <View style={styles.conteinerButtons}>
                <Pressable >
                    <View style={styles.containerIcon}>
                        <NotePencilIcon/>
                    </View>
                    <Text>Post</Text>
                </Pressable>
                <Pressable>
                    <View style={styles.containerIcon}>
                        <LightbulbIcon/>
                    </View>
                    <Text>Evento</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerIcon: {
        backgroundColor: colors.primary[50],
        width: 50,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    conteinerButtons: {
        flexDirection: 'row',
        gap: 20,
        justifyContent: "center",
    }
}); 