import {
  HouseIcon,
  CalendarBlankIcon,
  PlusIcon,
  NoteBlankIcon,
  ChartBarIcon,
} from 'phosphor-react-native';

import { View, Pressable } from 'react-native';
import { Tabs } from 'expo-router';

import { colors } from '../../theme/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTintColor: '#1A1A1A',

        tabBarActiveTintColor: colors.secondary[500],
        tabBarInactiveTintColor: '#999999',
        tabBarShowLabel: true,

        headerShown: true,

        tabBarStyle: {
          height: 80,
        },

        sceneStyle: {
          backgroundColor: '#F8F9FA',
        },

        tabBarIconStyle: {
          marginTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <HouseIcon size={size} color={String(color)} />
          ),
        }}
      />

      <Tabs.Screen
        name="calendario"
        options={{
          title: 'Calendário',
          tabBarIcon: ({ size, color }) => (
            <CalendarBlankIcon size={size} color={String(color)} />
          ),
        }}
      />

      <Tabs.Screen
        name="adicionar"
        options={{
          title: '',
          tabBarShowLabel: false,

          tabBarButton: () => (
            <Pressable
              onPress={() => {
                console.log('Adicionar');
              }}
              style={{
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 28,
                  backgroundColor: colors.secondary[500],
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PlusIcon
                  size={30}
                  color="white"
                  weight="regular"
                />
              </View>
            </Pressable>
          ),
        }}
      />

      <Tabs.Screen
        name="post"
        options={{
          title: 'Post',
          tabBarIcon: ({ size, color }) => (
            <NoteBlankIcon size={size} color={String(color)} />
          ),
        }}
      />

      <Tabs.Screen
        name="analise"
        options={{
          title: 'Análise',
          tabBarIcon: ({ size, color }) => (
            <ChartBarIcon size={size} color={String(color)} />
          ),
        }}
      />
    </Tabs>
  );
}