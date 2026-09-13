import {HouseIcon, AddressBookIcon} from 'phosphor-react-native';
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
          title: 'Tab One',
          tabBarIcon: ({size, color}) => <HouseIcon size={size} color={String(color)} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({size, color}) => <AddressBookIcon size={size} color={String(color)} />,
        }}
      />
    </Tabs>
  );
}
