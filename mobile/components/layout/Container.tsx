import { View, ViewProps } from 'react-native';

interface ContainerProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <View
      className={`w-full px-6 ${className ?? ''}`}
      {...props}
    >
      {children}
    </View>
  );
}