import { Pressable, Text, View } from 'react-native';

interface TabsProps {
    tabs: string[];
    activeTab: string;
    onChange: (tab: string) => void;

    /*Alterar com via ClassName*/
    backgroundClassName?: string;
    activeClassName?: string;
    inactiveClassName?: string;
    indicatorClassName?: string;

    /*Alterar com via hexadecimal*/
    backgroundColor?: string;
    activeColor?: string;
    inactiveColor?: string;
    indicatorColor?: string;
}

const DEFAULT_COLORS = {
  background: 'bg-gray-100',
  activeText: 'text-black',
  inactiveText: 'text-gray-800',
  indicator: 'bg-primary-500',
};

export function Tabs({
  tabs,
  activeTab,
  onChange,

  backgroundClassName = DEFAULT_COLORS.background,
  activeClassName = DEFAULT_COLORS.activeText,
  inactiveClassName = DEFAULT_COLORS.inactiveText,
  indicatorClassName = DEFAULT_COLORS.indicator,
  
  backgroundColor,
  activeColor,
  inactiveColor,
  indicatorColor,
}: TabsProps) {
  return (
    <View
      className={`w-full flex-row items-center rounded-[16px] ${backgroundClassName}`}
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      {tabs.map((tab) => {
        const isActive = tab === activeTab;

        return (
          <Pressable
            key={tab}
            onPress={() => onChange(tab)}
            accessibilityRole="tab"
            accessibilityState={{
              selected: isActive,
            }}
            className="flex-1 items-center justify-center"
          >
            <View
              className="relative w-full items-center py-3 pl-3 pr-3"
            >
              <Text
                className={`text-body-text font-poppins-medium ${
                  isActive ? activeClassName : inactiveClassName
                }`}
                style={
                  activeColor || inactiveColor
                    ? { color: isActive ? activeColor : inactiveColor }
                    : undefined
                }
              >
                {tab}
              </Text>

              {isActive && (
                <View
                  className={`absolute bottom-0 h-[2px] w-full ${indicatorClassName}`}
                  style={indicatorColor ? { backgroundColor: indicatorColor } : undefined}
                />
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}