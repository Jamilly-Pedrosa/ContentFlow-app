import { SymbolView } from 'expo-symbols';
import {Tabs } from 'expo-router';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerTintColor: '#1A1A1A',
        tabBarActiveTintColor: '',
        headerShown: true,
        sceneStyle: {
          backgroundColor: '#F8F9FA',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One'
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two'
        }}
      />
    </Tabs>
  );
}
