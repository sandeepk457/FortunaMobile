import { useState, type ReactNode } from "react";
import {
  Animated,
  type StyleProp,
  type ViewStyle,
} from "react-native";

interface HoverCardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function HoverCard({ children, style }: HoverCardProps) {
  const [hoverProgress] = useState(() => new Animated.Value(0));

  const animateHover = (toValue: number) => {
    Animated.spring(hoverProgress, {
      toValue,
      speed: 22,
      bounciness: 5,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      onPointerEnter={() => animateHover(1)}
      onPointerLeave={() => animateHover(0)}
      style={[
        style,
        {
          transform: [
            {
              translateY: hoverProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -4],
              }),
            },
            {
              scale: hoverProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.025],
              }),
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
