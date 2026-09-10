import { SymbolView } from 'expo-symbols';
import {Tabs } from 'expo-router';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:"",
        headerShown: true,
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
